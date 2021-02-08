package ftn.isa.team12.pharmacy.controller;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.domain.users.Pharmacist;
import ftn.isa.team12.pharmacy.domain.users.PharmacyAdministrator;
import ftn.isa.team12.pharmacy.dto.ExaminationDrugQuantityDTO;
import ftn.isa.team12.pharmacy.dto.ExaminationScheduleMedStuffDTO;
import ftn.isa.team12.pharmacy.dto.ScheduleExaminationDTO;
import ftn.isa.team12.pharmacy.email.EmailSender;
import ftn.isa.team12.pharmacy.service.*;
import ftn.isa.team12.pharmacy.dto.FreeTermDTO;
import ftn.isa.team12.pharmacy.service.ExaminationService;
import ftn.isa.team12.pharmacy.service.MedicalStuffService;
import ftn.isa.team12.pharmacy.service.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.time.LocalTime;
import java.util.*;

@RestController
@RequestMapping(value = "/api/examination", produces = MediaType.APPLICATION_JSON_VALUE)
public class ExaminationController {

    @Autowired
    ExaminationService examinationService;

    @Autowired
    MedicalStuffService medicalStuffService;

    @Autowired
    PharmacyService pharmacyService;

    @Autowired
    PatientService patientService;

    @Autowired
    PharmacistService pharmacistService;

    @Autowired
    DrugInPharmacyService drugInPharmacyService;

    @Autowired
    DrugService drugService;

    @Autowired
    EmailSender sender;

    @PreAuthorize("hasAnyRole('ROLE_DERMATOLOGIST', 'ROLE_PHARMACIST')")
    @GetMapping("/allByEmployee")
    public ResponseEntity<?> findAllByEmployee(Principal user) {
        Map<String, String> result = new HashMap<>();
        MedicalStuff medicalStuff = medicalStuffService.findByEmail(user.getName());
        List<Examination> examinations = examinationService.findAllByEmployee(medicalStuff);
        return new ResponseEntity<>(examinations, HttpStatus.OK);
    }


    @PreAuthorize("hasAnyRole('ROLE_DERMATOLOGIST', 'ROLE_PHARMACIST')")
    @PostMapping("/scheduleNewMedStuff")
    public ResponseEntity<?> scheduleNewMedStuff(@RequestBody ExaminationScheduleMedStuffDTO dto){
        System.out.println(dto.toString());
        Map<String, String> res = new HashMap<>();
        Examination examination = examinationService.scheduleNewMedStuff(dto);
        if(examination == null){
            res.put("result", "You can't schedule examination in desired time!");
            return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
        }
        res.put("result", "Examination successfully scheduled!");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_DERMATOLOGIST', 'ROLE_PHARMACIST')")
    @GetMapping("/getCurrentExamination/{id}")
    public ResponseEntity<?> getCurrentExamination(@PathVariable UUID id, Principal user) {
        Map<String, String> result = new HashMap<>();
        MedicalStuff medicalStuff = medicalStuffService.findByEmail(user.getName());
        Examination examination = examinationService.findCurrentById(id);

        if(examination == null){
            result.put("result", "The examination you are trying to access is passed or isn't started yet!");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }

        if(examination.getEmployee().getUserId() != medicalStuff.getUserId()){
            result.put("result", "You are trying to access to someone else's examination!");
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(examination, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_DERMATOLOGIST', 'ROLE_PHARMACIST')")
    @PostMapping("/givePenalty/{id}") //POST instead PUT because CORS policy doesn't allow PUT from some reason
    public ResponseEntity<?> givePenalty(@PathVariable UUID id, PenaltyReq req) {
        Map<String, String> result = new HashMap<>();
        Patient patient = patientService.givePenalty(id);
        if(patient == null){
            result.put("result", "The user with specified ID doesn't exist!");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        result.put("result", "Successfully given penalty!");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PreAuthorize("hasAnyRole('ROLE_DERMATOLOGIST', 'ROLE_PHARMACIST')")
    @GetMapping("/drugAvailability")
    public ResponseEntity<?> getDrugAvailability(ExaminationDrugQuantityDTO drugQuantityDTO) {
        Map<String, Integer> result = new HashMap<>();
        Map<String, List<Drug>> resultAlternative = new HashMap<>();
        Drug drug = drugService.findById(drugQuantityDTO.getDrugId());
        String drugName = drug.getName();
        Pharmacy pharmacy = pharmacyService.findPharmacyById(drugQuantityDTO.getPharmacyId());
        Set<PharmacyAdministrator> admins = pharmacy.getPhAdmins();
        int quantity = this.drugInPharmacyService.findDrugQuantity(drugQuantityDTO.getDrugId(), drugQuantityDTO.getPharmacyId());
        if(quantity <= 0){
            for(PharmacyAdministrator phAdmin : admins){
                sender.sendDrugQuantityNotificationToPhAdmin(phAdmin.getUsername(), drugName);
            }
            List<Drug> retVal = new ArrayList<>();
            Set<Drug> substitute = drug.getSubstituteDrugs();
            List<Drug> allergies = patientService.findAllergiesById(drugQuantityDTO.getPatientId());
            for(Drug subDrug : substitute){
                boolean isInAllergies = false;
                for(Drug allergy : allergies){
                    if(subDrug.getDrugId() == allergy.getDrugId()){
                        isInAllergies = true;
                        break;
                    }
                }
                if(!isInAllergies){
                    Integer quant = this.drugInPharmacyService.findDrugQuantity(subDrug.getDrugId(), drugQuantityDTO.getPharmacyId());
                    if(quant != null){
                        retVal.add(subDrug);
                    }
                }
            }
            resultAlternative.put("result", retVal);
            return new ResponseEntity<>(resultAlternative, HttpStatus.OK);
        }

        result.put("result", quantity);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @PreAuthorize("hasAnyRole('ROLE_DERMATOLOGIST', 'ROLE_PHARMACIST')")
    @GetMapping("/allByEmployeeAndPharmacy/{id}")
    public ResponseEntity<?> findAllByEmployeeAndPharmacy(@PathVariable UUID id, Principal user) {
        Map<String, String> result = new HashMap<>();
        MedicalStuff medicalStuff = medicalStuffService.findByEmail(user.getName());
        Pharmacy pharmacy = pharmacyService.findPharmacyById(id);
        if(pharmacy == null){
            result.put("result", "Wrong pharmacy id!");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        List<Examination> examinations = examinationService.findAllByEmployeeAndPharmacy(medicalStuff, pharmacy);
        return new ResponseEntity<>(examinations, HttpStatus.OK);
    }



    static class PenaltyReq{
        private int penalty;
    };

    @PostMapping("/pharmaciesWithFreeTerms/")
    public ResponseEntity<List<Pharmacy>> findPharmaciesWithFreeTerms(@RequestBody FreeTermDTO dto)  {
        List<Examination> examinations = this.examinationService.findPharmaciesWithFreeTerm(dto.getDate(),dto.getTime());
        List<Pharmacy> pharmacies = new ArrayList<>();
        List<Pharmacist> pharmacists = this.pharmacistService.findAll();
        for(Examination ex : examinations) {
            if(pharmacists.contains(ex.getEmployee())) {
               if(!pharmacies.contains(ex.getPharmacy())) {
                   pharmacies.add(ex.getPharmacy());
               }
            }
        }

        return new ResponseEntity<>(pharmacies, HttpStatus.OK);
    }
    @PostMapping("/scheduleNew/")
    public ResponseEntity<Examination> scheduleExamination(@RequestBody ScheduleExaminationDTO dto)  {
        Patient patient = this.patientService.findByEmail(dto.getPatientEmail());
        Examination examination = this.examinationService.findByEmployeePharmacyTimeDate(dto.getUserId(), dto.getPharmacyName(), dto.getDate(), dto.getTime());
        examination.setPatient(patient);
        this.examinationService.save(examination);
        return new ResponseEntity<>(examination, HttpStatus.OK);
    }

    @GetMapping("/findAvailablePharmacists/{pharmacyName}")
    public ResponseEntity<List<Pharmacist>> findAvailablePharmacists(@PathVariable String pharmacyName)  {
        List<MedicalStuff> medicalStuffs = this.examinationService.findAvailableByPharmacy(pharmacyName);
        List<Pharmacist> pharmacists = new ArrayList<>();
        List<Pharmacist> phamacists1 = this.pharmacistService.findAll();
        for (MedicalStuff ms : medicalStuffs) {
            if(phamacists1.contains(ms)) {
                pharmacists.add((Pharmacist) ms);
            }
        }

        return new ResponseEntity<>(pharmacists, HttpStatus.OK);
    }
}

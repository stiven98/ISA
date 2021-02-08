package ftn.isa.team12.pharmacy.controller;

import ftn.isa.team12.pharmacy.domain.common.WorkTime;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.dto.BusyDateDTO;
import ftn.isa.team12.pharmacy.dto.ExaminationCreateDTO;
import ftn.isa.team12.pharmacy.dto.TimeDTO;
import ftn.isa.team12.pharmacy.repository.ExaminationRepository;
import ftn.isa.team12.pharmacy.repository.WorkTimeRepository;
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
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
    private WorkTimeRepository workTimeRepository;

    @Autowired
    private ExaminationRepository examinationRepository;


    @PreAuthorize("hasAnyRole('ROLE_DERMATOLOGIST', 'ROLE_PHARMACIST')")
    @GetMapping("/allByEmployee")
    public ResponseEntity<?> findAllByEmployee(Principal user) {
        Map<String, String> result = new HashMap<>();
        MedicalStuff medicalStuff = medicalStuffService.findByEmail(user.getName());
        List<Examination> examinations = examinationService.findAllByEmployee(medicalStuff);
        return new ResponseEntity<>(examinations, HttpStatus.OK);
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

    @PreAuthorize("hasAnyRole('ROLE_PH_ADMIN')")
    @PostMapping("/createExamination")
    public ResponseEntity<?> createExaminationForDermatologist(@RequestBody ExaminationCreateDTO dto){
        Map<String, String> result = new HashMap<>();
        Examination examination = examinationService.addExaminationForDermatologist(dto);
        if(examination == null) {
            result.put("result", "Can't create examination");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        result.put("result","Successfully create examination");
        return new ResponseEntity<>(result,HttpStatus.OK);
    }


    @PreAuthorize("hasAnyRole('ROLE_PH_ADMIN')")
    @GetMapping("/a")
    public ResponseEntity<List<WorkTime>> sada(){


        return new ResponseEntity<>(workTimeRepository.findAllByEmployeeLoginInfoEmail("aca@faca.com"),HttpStatus.OK);
    }


    @PreAuthorize("hasAnyRole('ROLE_PH_ADMIN')")
    @PostMapping("/busyTime")
    public ResponseEntity<BusyDateDTO> busyTime(@RequestBody TimeDTO dto) throws ParseException {
        return new ResponseEntity<>(examinationService.busyTime(dto.getEmail(),dto.getDate()),HttpStatus.OK);
    }

}

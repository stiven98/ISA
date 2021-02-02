package ftn.isa.team12.pharmacy.controller;
import ftn.isa.team12.pharmacy.domain.common.City;
import ftn.isa.team12.pharmacy.domain.common.Country;
import ftn.isa.team12.pharmacy.domain.common.Location;
import ftn.isa.team12.pharmacy.domain.enums.UserCategory;
import ftn.isa.team12.pharmacy.domain.users.*;
import ftn.isa.team12.pharmacy.dto.PatientDTO;
import ftn.isa.team12.pharmacy.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.*;


@RestController
@RequestMapping(value = "/api/patient", produces = MediaType.APPLICATION_JSON_VALUE)
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private UserService userService;

    @Autowired
    private MedicalStuffService medicalStuffService;

    @Autowired
    private LocationService locationService;

    @Autowired
    private CountryService countryService;

    @Autowired
    private CityService cityService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PreAuthorize("hasRole('ROLE_PH_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<PatientDTO>> findAll() {
        List<Patient> patients = patientService.findAll();
        List<PatientDTO> dto = new ArrayList<>();
        for (Patient p: patients) {
            dto.add(new PatientDTO(p));
        }
        return new ResponseEntity<List<PatientDTO>>(dto, HttpStatus.OK);
    }
    @PreAuthorize("hasAnyRole('ROLE_DERMATOLOGIST','ROLE_PHARMACIST')")
    @GetMapping("/getPatientsByMedicalStuffId/{id}")
    public ResponseEntity<?> findPatientsByMedicalStuff(@PathVariable UUID id) {
        Map<String, String> result = new HashMap<>();
        MedicalStuff medicalStuff = medicalStuffService.findById(id);
        if(medicalStuff == null){
            result.put("result", "The medical stuff user with specified id doesn't exist");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String email = currentUser.getName();
        User user = userService.findUserByEmail(email);
        if(user == null){
            result.put("result", "You can access just yours clients!");
            return new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
        }
        Set<Patient> patients = medicalStuffService.findPatientsByMedicalStuff(medicalStuff);
        List<PatientDTO> dtos = new ArrayList<>();
        patients.forEach(patient -> dtos.add(new PatientDTO(patient)));
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Patient> savePatient(@RequestBody Patient patient,
                                                HttpServletResponse response) {

        Patient existsPatient = patientService.findByEmail(patient.getLoginInfo().getEmail());
        if (existsPatient == null) {

            System.out.println("-------------------" + patient.getPassword());
            ResponseEntity.unprocessableEntity();
            patient.getAccountInfo().setActive(false);
            patient.getAccountInfo().setFirstLogin(true);
            patient.setPenalties(0);
            patient.getLoginInfo().setPassword(passwordEncoder.encode(patient.getPassword()));
            patient.setCategory(new AccountCategory());
            patient.getCategory().setCategory(UserCategory.bronse);
            patient.getCategory().setPoints(0);


            Country country = this.countryService.saveAndFlush(patient.getLocation().getCity().getCountry());
            patient.getLocation().getCity().setCountry(country);

            City city = this.cityService.saveAndFlush(patient.getLocation().getCity());
            patient.getLocation().setCity(city);

            Location location = this.locationService.saveAndFlush(patient.getLocation());
            patient.setLocation(location);

            patient = patientService.saveAndFlush(patient);

            //SMTP Send email

            return new ResponseEntity<>(patient, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(patient, HttpStatus.NO_CONTENT);
        }
    }

    void sendEmail(String email) {

    }

}

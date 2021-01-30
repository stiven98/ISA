package ftn.isa.team12.pharmacy.controller;


import ftn.isa.team12.pharmacy.domain.common.City;
import ftn.isa.team12.pharmacy.domain.common.Country;
import ftn.isa.team12.pharmacy.domain.common.Location;
import ftn.isa.team12.pharmacy.domain.enums.UserCategory;
import ftn.isa.team12.pharmacy.domain.users.AccountCategory;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.dto.PatientDTO;
import ftn.isa.team12.pharmacy.service.CityService;
import ftn.isa.team12.pharmacy.service.CountryService;
import ftn.isa.team12.pharmacy.service.LocationService;
import ftn.isa.team12.pharmacy.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping(value = "/api/patient", produces = MediaType.APPLICATION_JSON_VALUE)
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private LocationService locationService;

    @Autowired
    private CountryService countryService;

    @Autowired
    private CityService cityService;

    @PreAuthorize("hasRole('ROLE_PH_ADMIN')")

    @GetMapping("/all")
    public ResponseEntity<List<PatientDTO>> findAll() {
        List<Patient> patients = patientService.findAll();
        List<PatientDTO> dto = new ArrayList<PatientDTO>();
        for (Patient p: patients) {
            dto.add(new PatientDTO(p));
        }
        return new ResponseEntity<List<PatientDTO>>(dto, HttpStatus.OK);
    }

    @GetMapping("/patient/add")
    public ResponseEntity<String> savePatient(@RequestBody Patient patient,
                                                HttpServletResponse response) {

        Patient existsPatient = patientService.findByEmail(patient.getLoginInfo().getEmail());
        if (existsPatient == null) {

            ResponseEntity.unprocessableEntity();
            patient.getAccountInfo().setActive(false);
            patient.getAccountInfo().setFirstLogin(true);
            patient.setPenalties(0);
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

            return ResponseEntity.ok().body("Patient is registered!");
        } else {
            return ResponseEntity.ok().body("Email has been used!" );
        }
    }

}

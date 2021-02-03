package ftn.isa.team12.pharmacy.controller;
import ftn.isa.team12.pharmacy.domain.common.City;
import ftn.isa.team12.pharmacy.domain.common.Country;
import ftn.isa.team12.pharmacy.domain.common.Location;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.domain.users.User;
import ftn.isa.team12.pharmacy.dto.PatientDTO;
import ftn.isa.team12.pharmacy.email.EmailSender;
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
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

import java.util.UUID;



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

    @Autowired
    private EmailSender sender;

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


    @PostMapping("/add")
    public ResponseEntity<Patient> savePatient(@RequestBody Patient patientRequest,
                                                HttpServletResponse response) {

        User user = patientService.findByEmail(patientRequest.getLoginInfo().getEmail());

        if (user == null) {

            ResponseEntity.unprocessableEntity();

            Country country = this.countryService.saveAndFlush(patientRequest.getLocation().getCity().getCountry());
            patientRequest.getLocation().getCity().setCountry(country);

            City city = this.cityService.saveAndFlush(patientRequest.getLocation().getCity());
            patientRequest.getLocation().setCity(city);

            Location location = this.locationService.saveAndFlush(patientRequest.getLocation());
            patientRequest.setLocation(location);


            Patient patient = this.patientService.saveAndFlush(patientRequest);

            try {
                sender.sendVerificationEmail(patient.getLoginInfo().getEmail(), patient.getUserId().toString());
            } catch (Exception e) {
                return new ResponseEntity<>(patientRequest, HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(patient, HttpStatus.CREATED);
        } else {
            throw new IllegalArgumentException("Email already exist!");
        }
    }

    @GetMapping("/activateAccount/{id}")
    public void activateAccount(@PathVariable String id, HttpServletResponse httpServletResponse) {

        Patient patient = this.patientService.updateStatus(UUID.fromString(id));
        httpServletResponse.setHeader("Location", "http://localhost:4200/login");
        httpServletResponse.setStatus(302);
    }



}

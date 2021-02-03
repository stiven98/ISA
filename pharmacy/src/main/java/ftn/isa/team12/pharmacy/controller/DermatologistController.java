package ftn.isa.team12.pharmacy.controller;


import ftn.isa.team12.pharmacy.domain.common.City;
import ftn.isa.team12.pharmacy.domain.common.Country;
import ftn.isa.team12.pharmacy.domain.common.Location;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.Dermatologist;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.domain.users.User;
import ftn.isa.team12.pharmacy.email.EmailSender;
import ftn.isa.team12.pharmacy.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/dermatologist", produces = MediaType.APPLICATION_JSON_VALUE)
public class DermatologistController {

    @Autowired
    private UserService userService;

    @Autowired
    private LocationService locationService;

    @Autowired
    private CountryService countryService;

    @Autowired
    private CityService cityService;

    @Autowired
    private DrugService drugService;

    @Autowired
    private PharmacyService pharmacyService;

    @Autowired
    private EmailSender sender;

    @Autowired
    private DermatologistService dermatologistService;

    @PreAuthorize("hasAnyRole('ROLE_SYSTEM_ADMINISTRATOR')")
    @PostMapping("/add")
    public ResponseEntity<Dermatologist> saveDermatologist(@RequestBody Dermatologist dermatologistRequest) {

        User user = userService.findUserByEmail(dermatologistRequest.getUsername());

        if (user == null) {

            ResponseEntity.unprocessableEntity();

            Country country = this.countryService.saveAndFlush(dermatologistRequest.getLocation().getCity().getCountry());
            dermatologistRequest.getLocation().getCity().setCountry(country);

            City city = this.cityService.saveAndFlush(dermatologistRequest.getLocation().getCity());
            dermatologistRequest.getLocation().setCity(city);

            Location location = this.locationService.saveAndFlush(dermatologistRequest.getLocation());
            dermatologistRequest.setLocation(location);

            Dermatologist dermatologist = this.dermatologistService.saveAndFlush(dermatologistRequest);

            return new ResponseEntity<Dermatologist>(dermatologist, HttpStatus.CREATED);
        } else {

            throw new IllegalArgumentException("Email already exist!");

        }


    }

}

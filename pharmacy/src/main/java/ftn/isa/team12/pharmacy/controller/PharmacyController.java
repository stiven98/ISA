package ftn.isa.team12.pharmacy.controller;
import ftn.isa.team12.pharmacy.domain.common.City;
import ftn.isa.team12.pharmacy.domain.common.Country;
import ftn.isa.team12.pharmacy.domain.common.Location;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.service.CityService;
import ftn.isa.team12.pharmacy.service.CountryService;
import ftn.isa.team12.pharmacy.service.LocationService;
import ftn.isa.team12.pharmacy.service.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/pharmacy",  produces = MediaType.APPLICATION_JSON_VALUE)
public class PharmacyController {

    @Autowired
    private PharmacyService pharmacyService;

    @Autowired
    private LocationService locationService;

    @Autowired
    private CountryService countryService;

    @Autowired
    private CityService cityService;


    @GetMapping("/all")
    public ResponseEntity<List<Pharmacy>> findAll() {
        List<Pharmacy> pharmacies = pharmacyService.findAll();
        return new ResponseEntity<List<Pharmacy>>(pharmacies, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Pharmacy> findPharmacyById(@PathVariable UUID id){
        Pharmacy pharmacy = pharmacyService.findPharmacyById(id);
        return new ResponseEntity<Pharmacy>(pharmacy,HttpStatus.OK);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Pharmacy> findPharmacyById(@PathVariable String name){
        Pharmacy pharmacy = pharmacyService.findPharmacyByName(name);
        return new ResponseEntity<Pharmacy>(pharmacy,HttpStatus.OK);
    }


    @PreAuthorize("hasRole('ROLE_SYSTEM_ADMINISTRATOR')")
    @PostMapping("/add")
    public ResponseEntity<Pharmacy> savePharmacy(@RequestBody Pharmacy pharmacyRequest) {

        Pharmacy existsPharmacy = pharmacyService.findPharmacyByName(pharmacyRequest.getName());

        if(existsPharmacy == null ) {
            ResponseEntity.unprocessableEntity();
            Country country = this.countryService.saveAndFlush(pharmacyRequest.getLocation().getCity().getCountry());
            pharmacyRequest.getLocation().getCity().setCountry(country);

            City city = this.cityService.saveAndFlush(pharmacyRequest.getLocation().getCity());
            pharmacyRequest.getLocation().setCity(city);

            Location location = this.locationService.saveAndFlush(pharmacyRequest.getLocation());
            pharmacyRequest.setLocation(location);

            Pharmacy pharmacy = this.pharmacyService.saveAndFlush(pharmacyRequest);

            return new ResponseEntity<>(pharmacy, HttpStatus.CREATED);
        } else {
            throw new IllegalArgumentException("Pharmacy with name already exist!");
        }

    }

}

package ftn.isa.team12.pharmacy.controller;

import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.service.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/pharmacy",  produces = MediaType.APPLICATION_JSON_VALUE)
public class PharmacyController {

    @Autowired
    private PharmacyService pharmacyService;

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


}

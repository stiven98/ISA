package ftn.isa.team12.pharmacy.controller;


import ftn.isa.team12.pharmacy.domain.users.PharmacyAdministrator;
import ftn.isa.team12.pharmacy.service.PharmacyAdministratorService;
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
@RequestMapping(value = "/api/phadmin", produces = MediaType.APPLICATION_JSON_VALUE)
public class PharmacyAdministratorController {


    @Autowired
    private PharmacyAdministratorService pharmacyAdministratorService;


    @GetMapping("/all")
    public ResponseEntity<List<PharmacyAdministrator>> findAll() {
        List<PharmacyAdministrator> phAdmin = pharmacyAdministratorService.findAll();

        return new ResponseEntity<List<PharmacyAdministrator>>(phAdmin,HttpStatus.OK);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<PharmacyAdministrator> findAdminByEmail(@PathVariable String email) {
        PharmacyAdministrator phAdmin = pharmacyAdministratorService.findAdminByEmail(email);

        return new ResponseEntity<PharmacyAdministrator>(phAdmin,HttpStatus.OK);
    }

    @GetMapping("/pharmacyId/{pharmacyId}")
    public ResponseEntity<PharmacyAdministrator> findAdminByPharmacyId(@PathVariable UUID pharmacyId) {
        PharmacyAdministrator phAdmin = pharmacyAdministratorService.findAdminByPharmacyId(pharmacyId);

        return new ResponseEntity<PharmacyAdministrator>(phAdmin,HttpStatus.OK);
    }





}

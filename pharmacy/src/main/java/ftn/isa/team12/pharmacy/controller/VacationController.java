package ftn.isa.team12.pharmacy.controller;


import ftn.isa.team12.pharmacy.dto.VacationDTO;
import ftn.isa.team12.pharmacy.service.VacationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/vacation", produces = MediaType.APPLICATION_JSON_VALUE)
public class VacationController {

    @Autowired
    VacationService vacationService;



    @PreAuthorize("hasAnyRole('ROLE_PH_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<VacationDTO>> addDermatologistInPharmacy(){
        return new ResponseEntity<>(vacationService.getAllFromPharmacyForPharmacist(),HttpStatus.OK);
    }



}

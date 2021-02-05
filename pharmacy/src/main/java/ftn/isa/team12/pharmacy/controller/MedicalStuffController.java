package ftn.isa.team12.pharmacy.controller;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.domain.users.User;
import ftn.isa.team12.pharmacy.domain.users.Vacation;
import ftn.isa.team12.pharmacy.service.MedicalStuffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.AccessDeniedException;
import java.security.Principal;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/medicalStuff", produces = MediaType.APPLICATION_JSON_VALUE)
public class MedicalStuffController {

    @Autowired
    private MedicalStuffService medicalStuffService;

    @GetMapping("/id/{id}")
    public User findById(@PathVariable UUID id) throws AccessDeniedException {
        return medicalStuffService.findById(id);
    }

    @PreAuthorize("hasAnyRole('ROLE_DERMATOLOGIST', 'ROLE_PHARMACIST')")
    @GetMapping("/vacations")
    public ResponseEntity<?> findEmployeeVacations(Principal user){
        MedicalStuff medicalStuff = medicalStuffService.findByEmail(user.getName());
        Set<Vacation> vacations = medicalStuff.getVacations();
        return new ResponseEntity<>(vacations, HttpStatus.OK);
    }

}

package ftn.isa.team12.pharmacy.controller;

import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.domain.users.User;
import ftn.isa.team12.pharmacy.service.ExaminationService;
import ftn.isa.team12.pharmacy.service.MedicalStuffService;
import ftn.isa.team12.pharmacy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/examination", produces = MediaType.APPLICATION_JSON_VALUE)
public class ExaminationController {

    @Autowired
    ExaminationService examinationService;

    @Autowired
    MedicalStuffService medicalStuffService;

    @PreAuthorize("hasAnyRole('ROLE_DERMATOLOGIST', 'ROLE_PHARMACIST')")
    @GetMapping("/allByEmployee")
    public ResponseEntity<?> findAllByEmployee(Principal user) {
        Map<String, String> result = new HashMap<>();
        MedicalStuff medicalStuff = medicalStuffService.findByEmail(user.getName());
        List<Examination> examinations = examinationService.findAllByEmployee(medicalStuff);
        return new ResponseEntity<>(examinations, HttpStatus.OK);
    }

}

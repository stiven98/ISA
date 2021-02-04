package ftn.isa.team12.pharmacy.controller;

import ftn.isa.team12.pharmacy.dto.EmployeesDTO;
import ftn.isa.team12.pharmacy.dto.EmployeesSearchDTO;
import ftn.isa.team12.pharmacy.service.DermatologistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/dermatologist", produces = MediaType.APPLICATION_JSON_VALUE)
public class DermatologistController {

    @Autowired
    private DermatologistService dermatologistService;

    @PreAuthorize("hasAnyRole('ROLE_PATIENT')") // Dodati ostale role
    @GetMapping("/all")
    public ResponseEntity<List<EmployeesDTO>> findAll() {
        return new ResponseEntity<>(dermatologistService.findAllDermatologist(), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_PH_ADMIN')") // Dodati ostale role
    @GetMapping("/all/{email}")
    public ResponseEntity<List<EmployeesDTO>> findAllDermatologistInPharmacyByAdmin(@PathVariable String email) {
        return new ResponseEntity<>(dermatologistService.findAllByPhADmin(email), HttpStatus.OK);
    }
    @PreAuthorize("hasAnyRole('ROLE_PATIENT', 'ROLE_PH_ADMIN')") // Dodati ostale role
    @PostMapping("/searchDermatologist")
    public ResponseEntity<List<EmployeesDTO>> searchDermatologist(@RequestBody EmployeesSearchDTO dto) {
        return new ResponseEntity<>(dermatologistService.searchDermatologist(dto), HttpStatus.OK);
    }


}

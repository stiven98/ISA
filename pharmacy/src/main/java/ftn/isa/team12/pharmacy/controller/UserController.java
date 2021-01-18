package ftn.isa.team12.pharmacy.controller;


import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.domain.users.User;
import ftn.isa.team12.pharmacy.dto.PatientDTO;
import ftn.isa.team12.pharmacy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.ws.Response;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<PatientDTO>> findAll() {
        List<Patient> patients = userService.findAll();
        List<PatientDTO> dto = new ArrayList<PatientDTO>();
        for (Patient p: patients) {
            dto.add(new PatientDTO(p));
        }
        return new ResponseEntity<List<PatientDTO>>(dto, HttpStatus.OK);
    }

}

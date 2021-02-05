package ftn.isa.team12.pharmacy.controller;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.domain.users.User;
import ftn.isa.team12.pharmacy.domain.users.Vacation;
import ftn.isa.team12.pharmacy.domain.users.VacationRequest;
import ftn.isa.team12.pharmacy.dto.VacationRequestDTO;
import ftn.isa.team12.pharmacy.service.MedicalStuffService;
import ftn.isa.team12.pharmacy.service.VacationRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/medicalStuff", produces = MediaType.APPLICATION_JSON_VALUE)
public class MedicalStuffController {

    @Autowired
    private MedicalStuffService medicalStuffService;

    @Autowired
    private VacationRequestService vacationRequestService;

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

    @PreAuthorize("hasAnyRole('ROLE_DERMATOLOGIST', 'ROLE_PHARMACIST')")
    @PostMapping("/requestVacation")
    public ResponseEntity<?> createVacationRequest(Principal user, @RequestBody VacationRequestDTO request){
        MedicalStuff medicalStuff = medicalStuffService.findByEmail(user.getName());
        VacationRequest vacationRequest = vacationRequestService.createNewRequest(medicalStuff, request);
        Map<String, String> result = new HashMap<>();
        if(vacationRequest == null)
        {
            result.put("result", "Unable to create vacation request!");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        result.put("result", "Vacation request created successfully!");
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

}

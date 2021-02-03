package ftn.isa.team12.pharmacy.controller;
import ftn.isa.team12.pharmacy.domain.drugs.DrugReservation;
import ftn.isa.team12.pharmacy.domain.enums.ReservationStatus;
import ftn.isa.team12.pharmacy.dto.DrugReservationDTO;
import ftn.isa.team12.pharmacy.repository.DrugReservationRepository;
import ftn.isa.team12.pharmacy.service.DrugReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/drugReservation", produces = MediaType.APPLICATION_JSON_VALUE)
public class DrugReservationController {
    @Autowired
    private DrugReservationService drugReservationService;

    @PreAuthorize("hasAnyRole('ROLE_PATIENT')")
    @PostMapping("/createReservation")
    public ResponseEntity<DrugReservation> createDrugReservation(@RequestBody DrugReservationDTO drugReservationDTO) {
        DrugReservation drugReservation = drugReservationService.createDrugReservation(drugReservationDTO);
        return  new ResponseEntity<>(drugReservation, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_PATIENT')")
    @GetMapping("/getPatientReservations/{email}")
    public ResponseEntity<List<DrugReservation>> findDrugReservationByPatient(@PathVariable String email) {
        List<DrugReservation> drugReservations = this.drugReservationService.findDrugReservationByPatient(email);
        return new ResponseEntity<>(drugReservations, HttpStatus.OK);
    }
    @PreAuthorize("hasAnyRole('ROLE_PATIENT')")
    @GetMapping("/cancel/{id}")
    public ResponseEntity<DrugReservation> cancelReservation(@PathVariable UUID id) {
        DrugReservation drugRes = this.drugReservationService.cancelReservation(id);
        return  new ResponseEntity<>(drugRes, HttpStatus.OK);
    }

}

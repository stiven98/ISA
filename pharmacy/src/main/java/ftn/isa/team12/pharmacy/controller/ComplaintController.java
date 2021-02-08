package ftn.isa.team12.pharmacy.controller;


import ftn.isa.team12.pharmacy.domain.common.Complaint;
import ftn.isa.team12.pharmacy.dto.ComplaintDTO;
import ftn.isa.team12.pharmacy.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/complaint", produces = MediaType.APPLICATION_JSON_VALUE)
public class ComplaintController {


    @Autowired
    private ComplaintService complaintService;

    @PreAuthorize("hasRole('ROLE_PATIENT')")
    @PostMapping("/add")
    public ResponseEntity<Complaint> saveAndFlush(@RequestBody ComplaintDTO complaintRequest){

        this.complaintService.saveAndFlush(complaintRequest);

        return ResponseEntity.ok(null);
    }


}

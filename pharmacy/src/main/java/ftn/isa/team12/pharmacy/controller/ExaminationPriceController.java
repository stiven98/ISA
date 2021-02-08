package ftn.isa.team12.pharmacy.controller;

import ftn.isa.team12.pharmacy.domain.drugs.DrugPrice;
import ftn.isa.team12.pharmacy.domain.pharmacy.ExaminationPrice;
import ftn.isa.team12.pharmacy.service.ExaminationPriceService;
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
@RequestMapping(value = "/api/examinationPrice", produces = MediaType.APPLICATION_JSON_VALUE)
public class ExaminationPriceController {


    @Autowired
    ExaminationPriceService examinationPriceService;


    @PreAuthorize("hasAnyRole('ROLE_PH_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<ExaminationPrice>> getAllDrugPrice(){
        return new ResponseEntity<>(examinationPriceService.getAllByValideDate(), HttpStatus.OK) ;
    }

}

package ftn.isa.team12.pharmacy.controller;

import ftn.isa.team12.pharmacy.domain.drugs.DrugPrice;
import ftn.isa.team12.pharmacy.dto.PriceDTO;
import ftn.isa.team12.pharmacy.service.DrugPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping(value = "/api/drugPrice", produces = MediaType.APPLICATION_JSON_VALUE)
public class DrugPriceController {

    @Autowired
    private DrugPriceService drugPriceService;

    @PostMapping ("/price")
    public Double findPharmaciesWithDrug(@RequestBody PriceDTO priceDTO) throws AccessDeniedException {
        return  drugPriceService.getPriceForDrug(priceDTO.getPharmacyId(),priceDTO.getDrugId());
    }


    @GetMapping("/all")
    public ResponseEntity<List<DrugPrice>> getAllDrugPrice(){
        return new ResponseEntity<>(drugPriceService.getAllDrugPrice(), HttpStatus.OK) ;
    }



}

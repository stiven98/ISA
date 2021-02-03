package ftn.isa.team12.pharmacy.controller;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.dto.DrugDTO;
import ftn.isa.team12.pharmacy.dto.DrugForOrderDTO;
import ftn.isa.team12.pharmacy.service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/drug", produces = MediaType.APPLICATION_JSON_VALUE)
public class DrugController {


    @Autowired
    private DrugService drugService;


    @GetMapping("/all")
    public ResponseEntity<List<DrugDTO>> findAllDrug(){
        List<Drug> drugs = drugService.findAll();
        List<DrugDTO> dto = new ArrayList<DrugDTO>();
        for (Drug d: drugs) {
            dto.add(new DrugDTO(d));
        }

        return new ResponseEntity<List<DrugDTO>>(dto, HttpStatus.OK);
    }


    @GetMapping("/drugForOrder")
    public ResponseEntity<List<DrugForOrderDTO>> getAll(){
        return new ResponseEntity<List<DrugForOrderDTO>>(drugService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Drug> findByName(@PathVariable String name){
        Drug drug = drugService.findDrugByName(name);
        return new ResponseEntity<>(drug,HttpStatus.OK);

    }




}

package ftn.isa.team12.pharmacy.controller;
import ftn.isa.team12.pharmacy.domain.drugs.Contraindication;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.drugs.Ingredient;
import ftn.isa.team12.pharmacy.domain.drugs.Manufacturer;
import ftn.isa.team12.pharmacy.domain.enums.IssuanceRegime;
import ftn.isa.team12.pharmacy.dto.DrugDTO;
import ftn.isa.team12.pharmacy.dto.DrugForOrderDTO;
import ftn.isa.team12.pharmacy.dto.NewDrugDTO;
import ftn.isa.team12.pharmacy.service.ContraindicationService;
import ftn.isa.team12.pharmacy.service.DrugService;
import ftn.isa.team12.pharmacy.service.IngredientService;
import ftn.isa.team12.pharmacy.service.ManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping(value = "/api/drug", produces = MediaType.APPLICATION_JSON_VALUE)
public class DrugController {


    @Autowired
    private DrugService drugService;

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private ContraindicationService contraindicationService;

    @Autowired
    private ManufacturerService manufacturerService;



    @PreAuthorize("hasRole('ROLE_SYSTEM_ADMINISTRATOR')")
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


    @PreAuthorize("hasRole('ROLE_SYSTEM_ADMINISTRATOR')")
    @PostMapping("/add")
    public ResponseEntity<Drug> saveDrug(@RequestBody NewDrugDTO drugRequest) {
        System.out.println(drugRequest);

        Set<Contraindication> contraindications = contraindicationService.getByIds(drugRequest.getContraindication());
        Set<Ingredient> ingredients = ingredientService.getByIds(drugRequest.getIngredients());
        Set<Drug> substituteDrugs = drugService.getByIds(drugRequest.getSubstituteDrug());
        Manufacturer manufacturer = manufacturerService.findById(drugRequest.getManufacturer());

        Drug drug = new Drug();
        drug.setManufacturer(manufacturer);
        drug.setContraindications(contraindications);
        drug.setName(drugRequest.getName());
        drug.setCode(drugRequest.getCode());
        drug.setIngredients(ingredients);
        drug.setSubstituteDrugs(substituteDrugs);
        drug.setTypeOfDrug(drugRequest.getTypeOfDrug());
        drug.setFormOfDrug(drugRequest.getFormOfDrug());
        drug.setIssuanceRegime((drugRequest.getIssuanceRegime().equals("With recipe") ? IssuanceRegime.withRecipe : IssuanceRegime.withoutRecipe));
        drug = this.drugService.saveAndFlush(drug);

        System.out.println(drug);

        return new ResponseEntity<>(drug, HttpStatus.CREATED);
    }




}

package ftn.isa.team12.pharmacy.controller;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.drugs.ERecipe;
import ftn.isa.team12.pharmacy.domain.drugs.ERecipeItem;
import ftn.isa.team12.pharmacy.service.DrugMarksService;
import ftn.isa.team12.pharmacy.service.DrugReservationService;
import ftn.isa.team12.pharmacy.service.ERecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "api/drugMarks", produces = MediaType.APPLICATION_JSON_VALUE)
public class DrugMarksController {
    @Autowired
    private DrugMarksService drugMarksService;

    @Autowired
    private DrugReservationService drugReservationService;

    @Autowired
    private ERecipeService eRecipeService;


    @PreAuthorize("hasAnyRole('ROLE_PATIENT')")
    @GetMapping("/drugsForPatient/{email}")
    public ResponseEntity<List<Drug>> cancelReservation(@PathVariable String email) {
        List<Drug> drugs = this.drugReservationService.findDrugsPatientReserved(email);
        List<ERecipe> eRecipes = this.eRecipeService.findAllERecipesByPatient(email);
        Set<ERecipeItem> eRecipeItems = new HashSet<>();
        for(ERecipe eRecipe : eRecipes) {
            eRecipeItems.addAll(eRecipe.getERecipeItems());
        }
        List<Drug> drugsFromErecipe = new ArrayList<>();
        for(ERecipeItem item : eRecipeItems) {
            if(!drugsFromErecipe.contains(item.getDrug())) {
                drugsFromErecipe.add(item.getDrug());
            }
        }
        List<Drug> drugList = new ArrayList<>();
        for(Drug drug : drugs) {
            if(!drugList.contains(drug)) {
                drugList.add(drug);
            }
        }
        for(Drug drug : drugsFromErecipe) {
            if(!drugList.contains(drug)) {
                drugList.add(drug);
            }
        }
        return  new ResponseEntity<>(drugList, HttpStatus.OK);
    }
}

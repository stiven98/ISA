package ftn.isa.team12.pharmacy.controller;
import ftn.isa.team12.pharmacy.domain.drugs.ERecipe;
import ftn.isa.team12.pharmacy.service.ERecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/erecepie", produces = MediaType.APPLICATION_JSON_VALUE )
public class ERecipeController {

    @Autowired
    private ERecipeService eRecipeService;


    @GetMapping("/getPatientERecepies/{email}")
    public ResponseEntity<List<ERecipe>> findERecepiesByPatient(@PathVariable String email) {
        List<ERecipe> eRecipes =  this.eRecipeService.findAllERecipesByPatient(email);
        return new ResponseEntity<>(eRecipes, HttpStatus.OK);
    }


}

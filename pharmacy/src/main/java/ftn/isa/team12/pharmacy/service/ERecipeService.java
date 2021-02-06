package ftn.isa.team12.pharmacy.service;

import ftn.isa.team12.pharmacy.domain.drugs.ERecipe;

import java.util.List;
import java.util.UUID;

public interface ERecipeService {

    List<ERecipe> findAllERecipesByPatient(String email);

}

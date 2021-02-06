package ftn.isa.team12.pharmacy.service;

import ftn.isa.team12.pharmacy.domain.drugs.ERecipe;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;

import java.util.List;

public interface ERecipeService {

    List<ERecipe> findAllERecipesByPatient(String email);

    List<Pharmacy> findPharmaciesWherePatientHasERecipe(String patientEmail);

}

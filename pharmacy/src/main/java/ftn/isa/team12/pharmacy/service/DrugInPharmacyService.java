package ftn.isa.team12.pharmacy.service;

import ftn.isa.team12.pharmacy.domain.drugs.Drug;

import java.util.List;
import java.util.UUID;

public interface DrugInPharmacyService {

    List<Drug> findDrugInPharmacyById(UUID id);
}

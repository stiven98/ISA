package ftn.isa.team12.pharmacy.service;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.dto.DrugForOrderDTO;

import java.util.List;
import java.util.UUID;

public interface DrugService {

    List<Drug> findAll();
    Drug findById(UUID id);

    List<DrugForOrderDTO> getAll();

    Drug findDrugByName(String drugName);

}

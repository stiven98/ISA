package ftn.isa.team12.pharmacy.service;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.dto.DrugForOrderDTO;
import ftn.isa.team12.pharmacy.dto.ExaminationDataRequestDTO;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface DrugService {

    List<Drug> findAll();
    Drug findById(UUID id);

    List<DrugForOrderDTO> getAll();

    Drug findDrugByName(String drugName);

    Set<Drug> getByIds(List<String> substituteDrug);

    Drug saveAndFlush(Drug drug);

    List<Drug> findAllByPharmacyAndPatient(ExaminationDataRequestDTO dto);
}

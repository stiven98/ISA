package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.dto.DrugForOrderDTO;
import ftn.isa.team12.pharmacy.repository.DrugRepository;
import ftn.isa.team12.pharmacy.service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DrugServiceImpl implements DrugService {

    @Autowired
    private DrugRepository drugRepository;
    
    
    @Override
    public List<Drug> findAll() {
        return drugRepository.findAll();
    }

    @Override
    public Drug findDrugByName(String drugName) {
        return drugRepository.findDrugByName(drugName);
    }

    @Override
    public Set<Drug> getByIds(List<String> substituteDrugIds) {
        Set<Drug> substituteDrugs = new HashSet<Drug>();
        for (String id : substituteDrugIds) {
            substituteDrugs.add(this.drugRepository.findById(UUID.fromString(id)).get());
        }
        return substituteDrugs;
    }

    @Override
    public Drug saveAndFlush(Drug drug) {
        // Add validation
        return this.drugRepository.saveAndFlush(drug);
    }

    @Override
    public Drug findById(UUID id) {
        return drugRepository.findById(id).orElseGet(null);
    }


    @Override
    public List<DrugForOrderDTO> getAll() {
        List<DrugForOrderDTO> dto = new ArrayList<>();
        for (Drug drug: drugRepository.findAll()) {
            dto.add(new DrugForOrderDTO(drug));
        }
        return dto;
    }
}

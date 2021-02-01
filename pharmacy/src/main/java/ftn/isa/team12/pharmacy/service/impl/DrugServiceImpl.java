package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.repository.DrugRepository;
import ftn.isa.team12.pharmacy.service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class DrugServiceImpl implements DrugService {

    @Autowired
    private DrugRepository drugRepository;
    
    
    @Override
    public List<Drug> findAll() {
        return drugRepository.findAll();
    }


    @Override
    public Drug findById(UUID id) {
        return drugRepository.findById(id).orElseGet(null);
    }
}

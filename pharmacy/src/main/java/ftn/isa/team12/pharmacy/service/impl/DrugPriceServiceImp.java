package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.repository.DrugPriceRepository;
import ftn.isa.team12.pharmacy.service.DrugPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class DrugPriceServiceImp implements DrugPriceService {

    @Autowired
    private DrugPriceRepository drugPriceRepository;

    @Override
    public double getPriceForDrug(UUID pharmacyId, UUID drugId) {
        return this.drugPriceRepository.getPriceForDrug(pharmacyId, drugId);
    }
}

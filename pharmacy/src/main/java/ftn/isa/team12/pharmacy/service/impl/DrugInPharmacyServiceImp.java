package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.drugs.DrugOrder;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.repository.DrugInPharmacyRepository;
import ftn.isa.team12.pharmacy.service.DrugInPharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class DrugInPharmacyServiceImp implements DrugInPharmacyService {

    @Autowired
    private DrugInPharmacyRepository drugInPharmacyRepository;


    @Override
    public List<Drug> findDrugInPharmacyById(UUID id) {
        return drugInPharmacyRepository.findDrugInPharmacyById(id);
    }


    @Override
    public void addDrugInPharmacyFromOrder(DrugOrder drugOrder) {
    }

    @Override
    public List<Pharmacy> findPharmaciesWithDrug(UUID id) {
        return this.drugInPharmacyRepository.findPharmaciesWithDrug(id);
    }

    @Override
    public int findDrugQuantity(UUID drugId, UUID pharmacyId) {
        return this.drugInPharmacyRepository.findDrugQuantity(drugId, pharmacyId);
    }
}

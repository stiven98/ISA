package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.drugs.DrugPrice;
import ftn.isa.team12.pharmacy.domain.users.PharmacyAdministrator;
import ftn.isa.team12.pharmacy.repository.DrugPriceRepository;
import ftn.isa.team12.pharmacy.service.DrugPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class DrugPriceServiceImp implements DrugPriceService {

    @Autowired
    private DrugPriceRepository drugPriceRepository;

    @Override
    public double getPriceForDrug(UUID pharmacyId, UUID drugId) {
        return this.drugPriceRepository.getPriceForDrug(pharmacyId, drugId);
    }


    @Override
    public List<DrugPrice> getAllDrugPrice() {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        PharmacyAdministrator pharmacyAdministrator = (PharmacyAdministrator) currentUser.getPrincipal();
        List<DrugPrice> list = drugPriceRepository.getAll(pharmacyAdministrator.getPharmacy(),new Date());

        return list;
    }
}

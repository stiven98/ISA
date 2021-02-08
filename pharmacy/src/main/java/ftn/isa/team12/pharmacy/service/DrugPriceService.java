package ftn.isa.team12.pharmacy.service;
import ftn.isa.team12.pharmacy.domain.drugs.DrugPrice;

import java.util.List;
import java.util.UUID;

public interface DrugPriceService {

    double getPriceForDrug(UUID pharmacyId, UUID drugId);


    List<DrugPrice> getAllDrugPrice();
}

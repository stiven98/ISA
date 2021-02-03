package ftn.isa.team12.pharmacy.service;
import java.util.UUID;

public interface DrugPriceService {

    double getPriceForDrug(UUID pharmacyId, UUID drugId);
}

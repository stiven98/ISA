package ftn.isa.team12.pharmacy.service;
import ftn.isa.team12.pharmacy.domain.drugs.DrugOrder;
import ftn.isa.team12.pharmacy.dto.DrugOrderDTO;

public interface DrugOrderService {
    DrugOrder createDrugOrder(DrugOrderDTO drugOrder);
}

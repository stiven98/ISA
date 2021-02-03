package ftn.isa.team12.pharmacy.service.impl;

import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.drugs.DrugInPharmacy;
import ftn.isa.team12.pharmacy.domain.drugs.DrugOrder;
import ftn.isa.team12.pharmacy.domain.drugs.DrugOrderItem;
import ftn.isa.team12.pharmacy.domain.enums.DrugOrderStatus;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.PharmacyAdministrator;
import ftn.isa.team12.pharmacy.dto.DrugForOrderDTO;
import ftn.isa.team12.pharmacy.dto.DrugOrderDTO;
import ftn.isa.team12.pharmacy.repository.DrugOrderRepository;
import ftn.isa.team12.pharmacy.service.DrugOrderService;
import ftn.isa.team12.pharmacy.service.DrugService;
import ftn.isa.team12.pharmacy.service.PharmacyAdministratorService;
import ftn.isa.team12.pharmacy.service.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class DrugOrderServiceImpl implements DrugOrderService {

    @Autowired
    private DrugOrderRepository drugOrderRepository;

    @Autowired
    private DrugService drugService;

    @Autowired
    private PharmacyService pharmacyService;

    @Autowired
    private PharmacyAdministratorService pharmacyAdministratorService;


    @Override
    public DrugOrder createDrugOrder(DrugOrderDTO drugOrder) {

        if(drugOrder.getDeadline().before(new Date())){
            throw new IllegalArgumentException("Bad input date");
        }
        DrugOrder order = new DrugOrder();
        order.setDrugOrderStatus(DrugOrderStatus.waitingForOffers);
        order.setDeadline(drugOrder.getDeadline());
        PharmacyAdministrator pharmacyAdministrator = pharmacyAdministratorService.findAdminByEmail(drugOrder.getPharmacyAdminEmail());
        order.setPharmacyAdministrator(pharmacyAdministrator);
        order.setPharmacy(pharmacyAdministrator.getPharmacy());
        Pharmacy pharmacy = pharmacyAdministrator.getPharmacy();

        for(DrugForOrderDTO orderDto : drugOrder.getDrugOrderItems()){
            DrugOrderItem item = new DrugOrderItem();
            Drug drug = drugService.findById(orderDto.getId());
            if(this.checkIfDrugExistInPharmacy(pharmacy,drug)){
                DrugInPharmacy drugInPharmacy = new DrugInPharmacy();
                drugInPharmacy.setDrug(drug);
                drugInPharmacy.setPharmacy(pharmacy);
                drugInPharmacy.setQuantity(0);
                pharmacy.getDrugs().add(drugInPharmacy);
            }
            item.setDrug(drug);
            item.setQuantity(orderDto.getQuantity());
            item.setDrugOrder(order);
            order.getDrugOrderItems().add(item);
        }

        pharmacy = pharmacyService.saveDrugInPharmacy(pharmacy);
        order.setPharmacy(pharmacy);
        order = drugOrderRepository.save(order);
        return order;
    }
    boolean checkIfDrugExistInPharmacy(Pharmacy pharmacy, Drug drug){
        for (DrugInPharmacy drugInPharmacy : pharmacy.getDrugs())
            if(drugInPharmacy.getDrug().getDrugId() == drug.getDrugId())
                return false;
        return true;
    }
}

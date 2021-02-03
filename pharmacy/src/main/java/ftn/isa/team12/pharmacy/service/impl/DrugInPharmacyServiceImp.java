package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.drugs.DrugInPharmacy;
import ftn.isa.team12.pharmacy.domain.drugs.DrugOrder;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.PharmacyAdministrator;
import ftn.isa.team12.pharmacy.dto.DrugForOrderDTO;
import ftn.isa.team12.pharmacy.dto.DrugInPharmacyChangesDTO;
import ftn.isa.team12.pharmacy.dto.DrugOrderDTO;
import ftn.isa.team12.pharmacy.repository.DrugInPharmacyRepository;
import ftn.isa.team12.pharmacy.service.DrugInPharmacyService;
import ftn.isa.team12.pharmacy.service.DrugService;
import ftn.isa.team12.pharmacy.service.PharmacyAdministratorService;
import ftn.isa.team12.pharmacy.service.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DrugInPharmacyServiceImp implements DrugInPharmacyService {

    @Autowired
    private DrugInPharmacyRepository drugInPharmacyRepository;

    @Autowired
    private PharmacyAdministratorService pharmacyAdministratorService;

    @Autowired
    private DrugService drugService;

    @Override
    public List<Drug> findDrugInPharmacyById(UUID id) {
        return drugInPharmacyRepository.findDrugInPharmacyById(id);
    }


    @Override
    public void addDrugInPharmacy(DrugInPharmacyChangesDTO drugInPharmacy) {
        PharmacyAdministrator phAdmin = pharmacyAdministratorService.findAdminByEmail(drugInPharmacy.getPharmacyAdminEmail());
        Drug drug = drugService.findById(drugInPharmacy.getDrugId());
        for (DrugInPharmacy druginph : phAdmin.getPharmacy().getDrugs()){
            if(druginph.getDrug().getDrugId() == drug.getDrugId()){
                throw new IllegalArgumentException("This drug already exist in pharmacy");
            }
        }
        DrugInPharmacy dip = new DrugInPharmacy();
        dip.setQuantity(0);
        dip.setPharmacy(phAdmin.getPharmacy());
        dip.setDrug(drug);
        drugInPharmacyRepository.save(dip);
    }

    @Override
    public void removeDrugInPharmacy(DrugInPharmacyChangesDTO dto) {
        //treba proveriti da li je lek rezervisan jos
        PharmacyAdministrator phAdmin = pharmacyAdministratorService.findAdminByEmail(dto.getPharmacyAdminEmail());
        Drug drug = drugService.findById(dto.getDrugId());
        for (DrugInPharmacy druginph : phAdmin.getPharmacy().getDrugs()){
            if(druginph.getDrug().getDrugId() == drug.getDrugId()){
                phAdmin.getPharmacy().getDrugs().remove(druginph);
                DrugInPharmacy dip = drugInPharmacyRepository.findDrugInPharmacy(drug.getDrugId(),phAdmin.getPharmacy().getId());
                dip.setPharmacy(null);
                drugInPharmacyRepository.delete(dip);
                return;
            }
        }
        throw new IllegalArgumentException("This drug doesn't exist in pharmacy");
    }

    @Override
    public List<Pharmacy> findPharmaciesWithDrug(UUID id) {
        return this.drugInPharmacyRepository.findPharmaciesWithDrug(id);
    }

    @Override
    public List<DrugForOrderDTO> findAllDrugInPharmacyByid(UUID id) {
        List<DrugForOrderDTO> dto = new ArrayList<>();
        for(DrugInPharmacy drugInPharmacy : drugInPharmacyRepository.findDrugInPharmacyByPharmacyId(id)){
            dto.add(new DrugForOrderDTO(drugInPharmacy.getDrug(),drugInPharmacy.getQuantity()));
        }
        return dto;
    }

    @Override
    public void updateDrugInPharmacy(DrugInPharmacyChangesDTO dto) {
        PharmacyAdministrator phAdmin = pharmacyAdministratorService.findAdminByEmail(dto.getPharmacyAdminEmail());
        Drug drug = drugService.findById(dto.getDrugId());
        for (DrugInPharmacy druginph : phAdmin.getPharmacy().getDrugs()){
            if(druginph.getDrug().getDrugId() == drug.getDrugId()){
                DrugInPharmacy dip = drugInPharmacyRepository.findDrugInPharmacy(drug.getDrugId(),phAdmin.getPharmacy().getId());
                if(dip.getQuantity() == dto.getQuantity() || dto.getQuantity() < 0){
                    throw new IllegalArgumentException("Bad input drug in pharmacy quantity");
                }
                dip.setQuantity(dto.getQuantity());
                drugInPharmacyRepository.save(dip);
                return;
            }
        }
        throw new IllegalArgumentException("This drug doesn't exist in pharmacy");
    }
}

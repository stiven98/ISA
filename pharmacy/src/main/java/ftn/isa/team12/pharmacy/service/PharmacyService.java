package ftn.isa.team12.pharmacy.service;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.dto.PharmacySearchDTO;

import java.util.List;
import java.util.UUID;

public interface PharmacyService {

    List<Pharmacy> findAll();

    Pharmacy findPharmacyByName(String name);

    Pharmacy findPharmacyById(UUID id);

    Pharmacy saveAndFlush(Pharmacy pharmacyRequest);

    Pharmacy saveDrugInPharmacy(Pharmacy pharmacy);

    List<Pharmacy> searchPharmacies(List<Pharmacy> pharmacies, PharmacySearchDTO dto);


}

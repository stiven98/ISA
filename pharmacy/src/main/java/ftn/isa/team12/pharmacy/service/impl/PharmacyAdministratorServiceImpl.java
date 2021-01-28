package ftn.isa.team12.pharmacy.service.impl;


import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.PharmacyAdministrator;
import ftn.isa.team12.pharmacy.repository.PharmacyAdministratorRepository;
import ftn.isa.team12.pharmacy.service.PharmacyAdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class PharmacyAdministratorServiceImpl implements PharmacyAdministratorService {

    @Autowired
    private PharmacyAdministratorRepository pharmacyAdministratorRepository;



    @Override
    public List<PharmacyAdministrator> findAll() { return this.pharmacyAdministratorRepository.findAll(); }

    @Override
    public PharmacyAdministrator findAdminByEmail(String email) {
        return pharmacyAdministratorRepository.findAdminByEmail(email);
    }


    @Override
    public PharmacyAdministrator findAdminByPharmacyId(UUID pharmacy) {
        return pharmacyAdministratorRepository.findAdminByPharmacyId(pharmacy);
    }
}

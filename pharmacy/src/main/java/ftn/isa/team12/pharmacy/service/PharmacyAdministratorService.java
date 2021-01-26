package ftn.isa.team12.pharmacy.service;

import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.LoginInfo;
import ftn.isa.team12.pharmacy.domain.users.PharmacyAdministrator;

import java.util.List;
import java.util.UUID;

public interface PharmacyAdministratorService {

    List<PharmacyAdministrator> findAll();

    PharmacyAdministrator findAdminByEmail(String email);

    PharmacyAdministrator findAdminByPharmacyId(UUID pharmacy);

}

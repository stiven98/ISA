package ftn.isa.team12.pharmacy.service.impl;


import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.domain.users.PharmacyAdministrator;
import ftn.isa.team12.pharmacy.domain.users.Vacation;
import ftn.isa.team12.pharmacy.repository.VacationRepository;
import ftn.isa.team12.pharmacy.service.VacationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class VacationServiceImpl implements VacationService {

    @Autowired
    VacationRepository vacationRepository;

    @Override
    public List<Vacation> checkVacationDay(Pharmacy pharmacy, Date date, MedicalStuff medicalStuff) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        PharmacyAdministrator pharmacyAdministrator = (PharmacyAdministrator) currentUser.getPrincipal();
        return vacationRepository.getAll(pharmacyAdministrator.getPharmacy(), date, medicalStuff);
    }


}
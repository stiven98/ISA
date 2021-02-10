package ftn.isa.team12.pharmacy.service.impl;


import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.*;
import ftn.isa.team12.pharmacy.dto.VacationDTO;
import ftn.isa.team12.pharmacy.repository.PharmacistRepository;
import ftn.isa.team12.pharmacy.repository.PharmacyRepository;
import ftn.isa.team12.pharmacy.repository.VacationRepository;
import ftn.isa.team12.pharmacy.repository.VacationRequestRepository;
import ftn.isa.team12.pharmacy.service.VacationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class VacationServiceImpl implements VacationService {

    @Autowired
    VacationRepository vacationRepository;

    @Autowired
    PharmacistRepository pharmacistRepository;

    @Autowired
    VacationRequestRepository vacationRequestRepository;

    @Autowired
    PharmacyRepository pharmacyRepository;


    @Override
    public List<Vacation> checkVacationDay(Pharmacy pharmacy, Date date, MedicalStuff medicalStuff) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        PharmacyAdministrator pharmacyAdministrator = (PharmacyAdministrator) currentUser.getPrincipal();
        return vacationRepository.getAll(pharmacyAdministrator.getPharmacy(), date, medicalStuff);
    }

    @Override
    public List<VacationDTO> getAllFromPharmacyForPharmacist() {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        PharmacyAdministrator pharmacyAdministrator = (PharmacyAdministrator) currentUser.getPrincipal();
        Pharmacy pharmacy = pharmacyRepository.findPharmacyById(pharmacyAdministrator.getPharmacy().getId());
        List<Pharmacist> pharmacists = pharmacistRepository.findAll();
        List<VacationRequest> vacationRequests = vacationRequestRepository.getAllFromPharmacy(pharmacy, new Date());
        List<VacationDTO> dto = new ArrayList<>();
        for (VacationRequest v: vacationRequests){
            for(Pharmacist p: pharmacists){
                if(p.getUserId() == v.getEmployee().getUserId())
                    dto.add(new VacationDTO(v));
            }
        }
        return dto;
    }
}
package ftn.isa.team12.pharmacy.service.impl;


import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.Dermatologist;
import ftn.isa.team12.pharmacy.domain.users.Pharmacist;
import ftn.isa.team12.pharmacy.domain.users.PharmacyAdministrator;
import ftn.isa.team12.pharmacy.dto.ReportsAverageMarksDTO;
import ftn.isa.team12.pharmacy.dto.ReportsEmployeeDTO;
import ftn.isa.team12.pharmacy.repository.DermatologistRepository;
import ftn.isa.team12.pharmacy.repository.PharmacistRepository;
import ftn.isa.team12.pharmacy.repository.PharmacyRepository;
import ftn.isa.team12.pharmacy.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    DermatologistRepository dermatologistRepository;

    @Autowired
    PharmacistRepository pharmacistRepository;

    @Autowired
    PharmacyRepository pharmacyRepository;

    @Override
    public ReportsAverageMarksDTO averageMarks() {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        PharmacyAdministrator pharmacyAdministrator = (PharmacyAdministrator) currentUser.getPrincipal();
        Pharmacy pharmacy = pharmacyRepository.findPharmacyById(pharmacyAdministrator.getPharmacy().getId());
        ReportsAverageMarksDTO reportsAverageMarksDTO = new ReportsAverageMarksDTO(pharmacy);

        for(Dermatologist der: pharmacy.getDermatologists())
            reportsAverageMarksDTO.getEmployeeDTOS().add(new ReportsEmployeeDTO(der,"Dermatologist"));

        for(Pharmacist der: pharmacy.getPharmacists())
            reportsAverageMarksDTO.getEmployeeDTOS().add(new ReportsEmployeeDTO(der,"Pharmacist"));


        return reportsAverageMarksDTO;
    }
}

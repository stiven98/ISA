package ftn.isa.team12.pharmacy.service.impl;


import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.Dermatologist;
import ftn.isa.team12.pharmacy.domain.users.Pharmacist;
import ftn.isa.team12.pharmacy.domain.users.PharmacyAdministrator;
import ftn.isa.team12.pharmacy.dto.ReportsAverageMarksDTO;
import ftn.isa.team12.pharmacy.dto.ReportsEmployeeDTO;
import ftn.isa.team12.pharmacy.dto.ReportsMonthlyDTO;
import ftn.isa.team12.pharmacy.repository.DermatologistRepository;
import ftn.isa.team12.pharmacy.repository.ExaminationRepository;
import ftn.isa.team12.pharmacy.repository.PharmacistRepository;
import ftn.isa.team12.pharmacy.repository.PharmacyRepository;
import ftn.isa.team12.pharmacy.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    DermatologistRepository dermatologistRepository;

    @Autowired
    PharmacistRepository pharmacistRepository;

    @Autowired
    PharmacyRepository pharmacyRepository;

    @Autowired
    ExaminationRepository examinationRepository;

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


    @Override
    public List<Integer> yearsReportsExamination(){
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        PharmacyAdministrator pharmacyAdministrator = (PharmacyAdministrator) currentUser.getPrincipal();
        Pharmacy pharmacy = pharmacyRepository.findPharmacyById(pharmacyAdministrator.getPharmacy().getId());
        ZoneId defaultZoneId = ZoneId.systemDefault();
        LocalDate now = LocalDate.now();
        LocalDate start = LocalDate.of(now.getYear(),1,1);
        List<Integer> years = new ArrayList<>();
        LocalDate end = LocalDate.now();

        for(int i =0; i<12; i++){
            if(i != 0)
                start = start.plusMonths(1);
            end = start.plusMonths(1);
            Date startDate = Date.from(start.atStartOfDay(defaultZoneId).toInstant());
            Date endDate = Date.from(end.atStartOfDay(defaultZoneId).toInstant());
            List<Examination> examinations = examinationRepository.getALlHealExamination(pharmacy,startDate,endDate);
            years.add(examinations.size());
        }
        return years;
    }


    @Override
    public ReportsMonthlyDTO monthlyReportExamination(Integer month) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        PharmacyAdministrator pharmacyAdministrator = (PharmacyAdministrator) currentUser.getPrincipal();
        Pharmacy pharmacy = pharmacyRepository.findPharmacyById(pharmacyAdministrator.getPharmacy().getId());
        ZoneId defaultZoneId = ZoneId.systemDefault();
        LocalDate now = LocalDate.now();
        LocalDate start = LocalDate.of(now.getYear(),month,1);
        ReportsMonthlyDTO reportsMonthlyDTO = new ReportsMonthlyDTO();
        LocalDate end = start.plusMonths(1);

        for(int i =0; i<31; i++) {
            if (i != 0)
                start = start.plusDays(1);
            if(start.isBefore(end)) {
                Date startDate = Date.from(start.atStartOfDay(defaultZoneId).toInstant());
                List<Examination> examinations = examinationRepository.getALlHealExaminationPerDay(pharmacy, startDate);
                if (examinations == null) {
                    reportsMonthlyDTO.getNumberOfExamination().add(0);
                    String a = String.valueOf(start.getDayOfMonth());
                    reportsMonthlyDTO.getDays().add(a);
                } else {
                    reportsMonthlyDTO.getNumberOfExamination().add(examinations.size());
                    String a = String.valueOf(start.getDayOfMonth());
                    reportsMonthlyDTO.getDays().add(a);
                }
            }else {
                break;
            }
        }
        return reportsMonthlyDTO;
    }
}

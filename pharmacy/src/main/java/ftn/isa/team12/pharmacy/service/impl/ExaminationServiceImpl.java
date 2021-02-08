package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.common.WorkTime;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.pharmacy.ExaminationPrice;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.Dermatologist;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.domain.users.PharmacyAdministrator;
import ftn.isa.team12.pharmacy.dto.BusyDateDTO;
import ftn.isa.team12.pharmacy.dto.ExaminationCreateDTO;
import ftn.isa.team12.pharmacy.repository.ExaminationPriceRepository;
import ftn.isa.team12.pharmacy.repository.ExaminationRepository;
import ftn.isa.team12.pharmacy.repository.WorkTimeRepository;
import ftn.isa.team12.pharmacy.service.DermatologistService;
import ftn.isa.team12.pharmacy.service.ExaminationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Service
public class ExaminationServiceImpl implements ExaminationService {

    @Autowired
    private ExaminationRepository examinationRepository;

    @Autowired
    private WorkTimeRepository workTimeRepository;

    @Autowired
    private DermatologistService dermatologistService;

    @Autowired
    private ExaminationPriceRepository examinationPriceRepository;

    @Override
    public List<Examination> findAll() {
        return null;
    }

    @Override
    public List<Examination> findAllByEmployee(MedicalStuff employee) {
        return examinationRepository.findAllByEmployee(employee);
    }

    @Override
    public List<Examination> findAllByEmployeeAndPharmacy(MedicalStuff employee, Pharmacy pharmacy) {
        return examinationRepository.findAllByEmployeeAndPharmacy(employee, pharmacy);
    }


    @Override
    public Examination addExaminationForDermatologist(ExaminationCreateDTO dto) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        PharmacyAdministrator pharmacyAdministrator = (PharmacyAdministrator) currentUser.getPrincipal();
        Dermatologist dermatologist = dermatologistService.findByEmail(dto.getEmail());
        ExaminationPrice examinationPrice = examinationPriceRepository.findByExaminationPriceId(dto.getPriceId());
        boolean flag = false;
        if(dermatologist == null || pharmacyAdministrator == null || examinationPrice == null)
            throw new IllegalArgumentException("Bad input");

        for (Pharmacy p : dermatologist.getPharmacies()){
            if(p.getId().toString().equals(pharmacyAdministrator.getPharmacy().getId().toString()) && examinationPrice.getPharmacy().getName().equals(pharmacyAdministrator.getPharmacy().getName())) {
                flag = true;
                break;
            }
        }

        if(!flag)
            throw new IllegalArgumentException("Bad input for pharmacy or examinationPrice");


        Examination examination = new Examination();
        examination.setDuration(dto.getDuration());
        examination.setDateOfExamination(dto.getDate());
        examination.setTimeOfExamination(dto.getStartTime());
        examination.setPatient(null);
        examination.setPharmacy(pharmacyAdministrator.getPharmacy());
        examination.setEmployee(dermatologist);
        examination.setExaminationPrice(examinationPrice);

        return examinationRepository.save(examination);
    }

    @Override
    public BusyDateDTO busyTime(String email, Date date) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        PharmacyAdministrator pharmacyAdministrator = (PharmacyAdministrator) currentUser.getPrincipal();
        Dermatologist dermatologist = dermatologistService.findByEmail(email);
        List<Examination> examinations = examinationRepository.findAllByEmployeeAndPharmacy(dermatologist,pharmacyAdministrator.getPharmacy());
        BusyDateDTO busyDateDTO = new BusyDateDTO();

        for(WorkTime a : workTimeRepository.findAllByEmployeeLoginInfoEmail(email)){
            a.getDate().setTime(0);
            date.setTime(0);
            if(a.getDate().equals(date)) {
                busyDateDTO.setStart(a.getStartTime());
                busyDateDTO.setEnd(a.getEndTime());
                break;
            }
        }
        if(dermatologist == null || pharmacyAdministrator == null)
            throw new IllegalArgumentException("Bad input");

            for (Examination ex: examinations){
                ex.getDateOfExamination().setTime(0);
                date.setTime(0);
                if(ex.getDateOfExamination().equals(date)){
                    BusyDateDTO b = new BusyDateDTO();
                    b.setStart(ex.getTimeOfExamination());
                    b.setEnd(ex.getTimeOfExamination().plusMinutes(ex.getDuration()));
                    busyDateDTO.getBusyDateDTOS().add(b);
                }
            }


        return busyDateDTO;
    }
}

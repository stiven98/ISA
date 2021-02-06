package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.repository.ExaminationRepository;
import ftn.isa.team12.pharmacy.service.ExaminationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class ExaminationServiceImpl implements ExaminationService {

    @Autowired
    ExaminationRepository examinationRepository;

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
    public Examination findById(UUID id) {
        return examinationRepository.findExaminationByExaminationId(id);
    }

    @Override
    public Examination findCurrentById(UUID id) {
        Examination examination = examinationRepository.findExaminationByExaminationId(id);
        if(examination == null){
            return null;
        }else{
            Date today = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
            boolean sameDate = sdf.format(today).equals(sdf.format(examination.getDateOfExamination()));
            if(!sameDate){
                return null;
            }
            LocalTime now = LocalTime.now();
            LocalTime start = examination.getTimeOfExamination();
            if(now.compareTo(start) < 0){
                return null;
            }
            LocalTime end = start.plusMinutes(examination.getDuration());
            if(now.compareTo(end) > 0){
                return null;
            }
            return examination;
        }
    }

}

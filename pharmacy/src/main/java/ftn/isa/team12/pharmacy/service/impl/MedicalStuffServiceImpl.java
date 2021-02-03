package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.dto.PatientExaminationDTO;
import ftn.isa.team12.pharmacy.repository.MedicalStuffRepository;
import ftn.isa.team12.pharmacy.service.ExaminationService;
import ftn.isa.team12.pharmacy.service.MedicalStuffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class MedicalStuffServiceImpl implements MedicalStuffService {

    @Autowired
    private MedicalStuffRepository medicalStuffRepository;

    @Autowired
    private ExaminationService examinationService;


    @Override
    public MedicalStuff findById(UUID id) {
        return this.medicalStuffRepository.findByUserId(id);
    }

    @Override
    public Set<PatientExaminationDTO> findPatientsByMedicalStuff(MedicalStuff medicalStuff) {
        List<Examination> examinations = examinationService.findAllByEmployee(medicalStuff);
        Set<PatientExaminationDTO> patients = new HashSet<>();
        if(examinations == null){
            return patients;
        }
        examinations.forEach(examination -> { patients.add(new PatientExaminationDTO(examination.getPatient(), examination)); });
        return patients;
    }

}

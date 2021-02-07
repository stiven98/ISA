package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.repository.ExaminationRepository;
import ftn.isa.team12.pharmacy.service.ExaminationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<Pharmacy> findAllPharmaciesWherePatientHadExamination(UUID patientId) {
        return this.examinationRepository.findAllPharmaciesWherePatientHadExamination(patientId);
    }

    @Override
    public List<MedicalStuff> findAllMedicalStuffThatTreatedPatient(UUID patientId) {
        return this.examinationRepository.findAllMedicalStuffThatTreatedPatient(patientId);
    }

}

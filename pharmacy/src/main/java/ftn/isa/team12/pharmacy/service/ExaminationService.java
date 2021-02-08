package ftn.isa.team12.pharmacy.service;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.dto.ExaminationScheduleMedStuffDTO;

import java.util.List;
import java.util.UUID;

public interface ExaminationService {
    List<Examination> findAll();
    List<Examination> findAllByEmployee(MedicalStuff employee);
    List<Examination> findAllByPatient(Patient patient);
    List<Examination> findAllByEmployeeAndPharmacy(MedicalStuff employee, Pharmacy pharmacy);
    Examination findById(UUID id);
    Examination findCurrentById(UUID id);

    Examination scheduleNewMedStuff(ExaminationScheduleMedStuffDTO dto);
}

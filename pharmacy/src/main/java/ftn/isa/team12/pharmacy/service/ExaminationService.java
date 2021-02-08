package ftn.isa.team12.pharmacy.service;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.dto.BusyDateDTO;
import ftn.isa.team12.pharmacy.dto.ExaminationCreateDTO;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.dto.ExaminationScheduleMedStuffDTO;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface ExaminationService {
    List<Examination> findAll();
    List<Examination> findAllByEmployee(MedicalStuff employee);
    List<Examination> findAllByPatient(Patient patient);
    List<Examination> findAllByEmployeeAndPharmacy(MedicalStuff employee, Pharmacy pharmacy);



    Examination addExaminationForDermatologist(ExaminationCreateDTO dto);
    BusyDateDTO busyTime(String email, Date date);

    Examination findById(UUID id);
    Examination findCurrentById(UUID id);
    Examination scheduleNewMedStuff(ExaminationScheduleMedStuffDTO dto);
    List<Pharmacy> findAllPharmaciesWherePatientHadExamination(UUID patientId);
    List<MedicalStuff> findAllMedicalStuffThatTreatedPatient(UUID patientId);
    List<Pharmacy> findPharmaciesWithFreeTerm(Date date, LocalTime time);


}

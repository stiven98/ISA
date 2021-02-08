package ftn.isa.team12.pharmacy.repository;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface ExaminationRepository extends JpaRepository<Examination, UUID> {

    List<Examination> findAll();
    List<Examination> findAllByEmployee(MedicalStuff employee);
    List<Examination> findAllByPatient(Patient patient);
    List<Examination> findAllByEmployeeAndPharmacy(MedicalStuff employee, Pharmacy pharmacy);

    List<Examination> findAllByPharmacyId(UUID id);
    List<Examination> findAllByDateOfExaminationAndEmployeeUserId(Date date, UUID userID);


    Examination findExaminationByExaminationId(UUID examinationId);

    @Query("select ex.pharmacy from Examination  ex where ex.patient.userId = ?1 and ex.examinationStatus = 0")
    List<Pharmacy> findAllPharmaciesWherePatientHadExamination(UUID patientId);

    @Query("select ex.employee from Examination ex where ex.patient.userId = ?1 and ex.examinationStatus = 0")
    List<MedicalStuff> findAllMedicalStuffThatTreatedPatient(UUID patientId);


    @Query("select ex.pharmacy from Examination ex where ex.dateOfExamination = ?1 and ex.timeOfExamination = ?2 and ex.patient is null")
    List<Pharmacy> findPharmaciesWithFreeTerm(Date date, LocalTime time);


    List<Examination> findAllByEmployeeAndPharmacyAndDateOfExamination(MedicalStuff medicalStuff,Pharmacy ph, Date date );


}

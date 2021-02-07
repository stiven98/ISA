package ftn.isa.team12.pharmacy.service;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface ExaminationService {
    List<Examination> findAll();
    List<Examination> findAllByEmployee(MedicalStuff employee);
    List<Examination> findAllByEmployeeAndPharmacy(MedicalStuff employee, Pharmacy pharmacy);
    List<Pharmacy> findAllPharmaciesWherePatientHadExamination(UUID patientId);
    List<MedicalStuff> findAllMedicalStuffThatTreatedPatient(UUID patientId);

    List<Pharmacy> findPharmaciesWithFreeTerm(Date date, LocalTime time);


}

package ftn.isa.team12.pharmacy.service;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.users.AccountCategory;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import java.util.List;

public interface PatientService {

    List<Patient> findAll();
    Patient saveAndFlush(Patient patient);
    Patient findByEmail(String email);
    List<Drug> findPatientAllergies(String email);
    void addAllergy(Patient patient);
    AccountCategory findAccountCategory(String email);
    Integer findPenalty(String email);

}

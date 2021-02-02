package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.users.AccountCategory;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.repository.PatientRepository;
import ftn.isa.team12.pharmacy.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public List<Patient> findAll() {
        return this.patientRepository.findAll();
    }


    @Override
    public Patient saveAndFlush(Patient patient) {
        return this.patientRepository.saveAndFlush(patient);
    }

    @Override
    public Patient findByEmail(String email) {
        return this.patientRepository.findByEmail(email);
    }

    @Override
    public List<Drug> findPatientAllergies(String email) {
        return this.patientRepository.findPatientAllergies(email);
    }

    @Override
    public void addAllergy(Patient patient) {
        this.patientRepository.save(patient);
    }

    @Override
    public AccountCategory findAccountCategory(String email) {
        return this.patientRepository.findAccountCategory(email);
    }

    @Override
    public Integer findPenalty(String email) {
        return this.patientRepository.findPenalty(email);
    }


}

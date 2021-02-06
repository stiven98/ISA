package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.enums.UserCategory;
import ftn.isa.team12.pharmacy.domain.users.AccountCategory;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.domain.users.User;
import ftn.isa.team12.pharmacy.repository.PatientRepository;
import ftn.isa.team12.pharmacy.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Patient> findAll() {
        return this.patientRepository.findAll();
    }

    @Override
    public Patient updateStatus(UUID id) {
        Patient patient =  this.patientRepository.getOne(id);
        patient.getAccountInfo().setActive(true);
        return this.patientRepository.save(patient);
    }

    @Override
    public Patient givePenalty(UUID id) {
        Patient patient = this.patientRepository.getOne(id);
        if(patient == null){
            return null;
        }
        int penalties = patient.getPenalties();
        patient.setPenalties(++penalties);
        return this.patientRepository.save(patient);
    }

    @Override
    public Patient saveAndFlush(Patient patient) {

        patient.getAccountInfo().setActive(false);
        patient.getAccountInfo().setFirstLogin(true);
        patient.setPenalties(0);
        patient.getLoginInfo().setPassword(passwordEncoder.encode(patient.getPassword()));
        patient.setCategory(new AccountCategory());
        patient.getCategory().setCategory(UserCategory.no_category);
        patient.getCategory().setPoints(0);
        return this.patientRepository.saveAndFlush(patient);
    }

    @Override
    public Patient findByEmail(String email) {
        return this.patientRepository.findByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) {
        return this.patientRepository.findUserByEmail(email);
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

package ftn.isa.team12.pharmacy.service.impl;

import ftn.isa.team12.pharmacy.domain.enums.UserCategory;
import ftn.isa.team12.pharmacy.domain.users.AccountCategory;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.domain.users.User;
import ftn.isa.team12.pharmacy.repository.PatientRepository;
import ftn.isa.team12.pharmacy.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    public User findByEmail(String email) {
        return this.patientRepository.findByEmail(email);
    }

}

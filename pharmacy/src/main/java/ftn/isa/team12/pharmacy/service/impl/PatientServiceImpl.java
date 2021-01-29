package ftn.isa.team12.pharmacy.service.impl;

import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.repository.PatientRepository;
import ftn.isa.team12.pharmacy.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

}

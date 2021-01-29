package ftn.isa.team12.pharmacy.service;

import ftn.isa.team12.pharmacy.domain.users.Patient;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface PatientService {

    List<Patient> findAll();
    Patient saveAndFlush(Patient patient);
    Patient findByEmail(String email);

}
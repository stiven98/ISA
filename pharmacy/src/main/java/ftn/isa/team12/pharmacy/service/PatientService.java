package ftn.isa.team12.pharmacy.service;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.domain.users.User;

import java.util.List;
import java.util.UUID;

public interface PatientService {

    List<Patient> findAll();
    Patient saveAndFlush(Patient patient);
    User findByEmail(String email);
    Patient updateStatus(UUID id);

}

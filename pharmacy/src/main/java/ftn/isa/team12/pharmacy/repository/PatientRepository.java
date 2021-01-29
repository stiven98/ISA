package ftn.isa.team12.pharmacy.repository;

import ftn.isa.team12.pharmacy.domain.users.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface PatientRepository extends JpaRepository<Patient, UUID> {

    @Query("SELECT patient from Patient patient WHERE patient.loginInfo.email = ?1")
    Patient findByEmail(String email);
}
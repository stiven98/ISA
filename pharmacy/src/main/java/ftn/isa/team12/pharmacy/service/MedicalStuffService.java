package ftn.isa.team12.pharmacy.service;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.domain.users.Patient;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface MedicalStuffService {

    MedicalStuff findById(UUID id);

    Set<Patient> findPatientsByMedicalStuff(MedicalStuff medicalStuff);
}

package ftn.isa.team12.pharmacy.service;

import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.nio.file.AccessDeniedException;
import java.util.UUID;

public interface MedicalStuffService extends UserDetailsService {

    MedicalStuff findById(UUID id) throws AccessDeniedException;
}

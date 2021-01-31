package ftn.isa.team12.pharmacy.service.impl;

import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.repository.MedicalStuffRepository;
import ftn.isa.team12.pharmacy.service.MedicalStuffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.UUID;
@Service
public class MedicalStuffServiceImpl implements MedicalStuffService {

    @Autowired
    private MedicalStuffRepository medicalStuffRepository;

    @Override
    public MedicalStuff findById(UUID id) throws AccessDeniedException {
        return this.medicalStuffRepository.findById(id).orElseGet(null);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return null;
    }
}

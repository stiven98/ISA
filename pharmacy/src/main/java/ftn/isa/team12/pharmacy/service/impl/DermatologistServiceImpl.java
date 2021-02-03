package ftn.isa.team12.pharmacy.service.impl;

import ftn.isa.team12.pharmacy.domain.users.Dermatologist;
import ftn.isa.team12.pharmacy.repository.DermatologistRepository;
import ftn.isa.team12.pharmacy.service.DermatologistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class DermatologistServiceImpl implements DermatologistService {

    @Autowired
    private DermatologistRepository dermatologistRepository;

    @Override
    public Dermatologist saveAndFlush(Dermatologist dermatologistRequest) {
        return this.dermatologistRepository.saveAndFlush(dermatologistRequest);
    }

    @Override
    public Dermatologist findById(UUID userId) {
        return this.dermatologistRepository.findDermatologistById(userId);
    }
}

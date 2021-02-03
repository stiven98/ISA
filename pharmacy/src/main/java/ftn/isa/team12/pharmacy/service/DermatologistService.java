package ftn.isa.team12.pharmacy.service;

import ftn.isa.team12.pharmacy.domain.users.Dermatologist;

import java.util.Optional;
import java.util.UUID;

public interface DermatologistService {


    Dermatologist saveAndFlush(Dermatologist dermatologistRequest);

    Dermatologist findById(UUID userId);
}

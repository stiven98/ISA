package ftn.isa.team12.pharmacy.repository;

import ftn.isa.team12.pharmacy.domain.users.Dermatologist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DermatologistRepository extends JpaRepository<Dermatologist, UUID> {
}

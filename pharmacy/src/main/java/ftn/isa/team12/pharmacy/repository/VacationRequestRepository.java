package ftn.isa.team12.pharmacy.repository;

import ftn.isa.team12.pharmacy.domain.users.VacationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VacationRequestRepository extends JpaRepository<VacationRequest, UUID> {
}

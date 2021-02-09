package ftn.isa.team12.pharmacy.repository;

import ftn.isa.team12.pharmacy.domain.common.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ComplaintRepository extends JpaRepository<Complaint, UUID> {
}

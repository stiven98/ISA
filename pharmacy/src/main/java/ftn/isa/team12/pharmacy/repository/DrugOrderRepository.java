package ftn.isa.team12.pharmacy.repository;

import ftn.isa.team12.pharmacy.domain.drugs.DrugOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DrugOrderRepository extends JpaRepository<DrugOrder, UUID> {

}

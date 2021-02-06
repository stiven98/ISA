package ftn.isa.team12.pharmacy.repository;

import ftn.isa.team12.pharmacy.domain.marks.DrugMarks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DrugMarksRepository extends JpaRepository<DrugMarks, UUID> {
}

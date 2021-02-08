package ftn.isa.team12.pharmacy.repository;

import ftn.isa.team12.pharmacy.domain.pharmacy.ExaminationPrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ExaminationPriceRepository  extends JpaRepository<ExaminationPrice, UUID> {
    ExaminationPrice findByExaminationPriceId(UUID id);
}

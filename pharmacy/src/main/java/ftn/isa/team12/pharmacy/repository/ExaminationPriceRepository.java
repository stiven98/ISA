package ftn.isa.team12.pharmacy.repository;

import ftn.isa.team12.pharmacy.domain.pharmacy.ExaminationPrice;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface ExaminationPriceRepository  extends JpaRepository<ExaminationPrice, UUID> {
    ExaminationPrice findByExaminationPriceId(UUID id);
    @Query("select ep from ExaminationPrice ep where ep.pharmacy = ?1 and ep.dateOfValidity.startDate <= ?2 and ep.dateOfValidity.endDate >= ?2 order by ep.dateOfValidity.endDate desc")
    List<ExaminationPrice> findLatestByPharmacy(Pharmacy pharmacy, Date date);
}

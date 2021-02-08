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


    @Query("select d from ExaminationPrice d where d.pharmacy= ?1 and d.dateOfValidity.startDate < ?2 and d.dateOfValidity.endDate > ?2")
    List<ExaminationPrice> getAll(Pharmacy pharmacy, Date date);


}

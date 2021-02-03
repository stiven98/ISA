package ftn.isa.team12.pharmacy.repository;
import ftn.isa.team12.pharmacy.domain.drugs.DrugReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface DrugReservationRepository extends JpaRepository<DrugReservation, UUID> {

    List<DrugReservation> findAllByPatientUserId(UUID userId);

    @Query("select reservation from DrugReservation  reservation where reservation.drug_reservation_id = ?1")
    DrugReservation findDrugReservationByDrug_reservation_id(UUID drug_reservation_id);
}

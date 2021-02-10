package ftn.isa.team12.pharmacy.repository;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import  ftn.isa.team12.pharmacy.domain.drugs.DrugReservation;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface DrugReservationRepository extends JpaRepository<DrugReservation, UUID> {

    List<DrugReservation> findAllByPatientUserId(UUID userId);

    @Query("select reservation from DrugReservation reservation where reservation.drug_reservation_id = ?1 and reservation.pharmacy.id = ?2")
    DrugReservation findDrugReservationByIdAndPharmacyId(UUID id, UUID pharmacyId);

    @Query("select reservation from DrugReservation  reservation where reservation.drug_reservation_id = ?1")
    DrugReservation findDrugReservationByDrug_reservation_id(UUID drug_reservation_id);

    @Query("select reservation.pharmacy from DrugReservation reservation where reservation.patient.userId=?1 and reservation.reservationStatus = 2")
    List<Pharmacy> findPharmaciesWherePatientReservedDrugs(UUID patientId);

    @Query("select reservation.drug from DrugReservation reservation where reservation.patient.userId=?1 and reservation.reservationStatus = 2")
    List<Drug> findDrugsPatientReserved(UUID patientId);

    @Query("select reservation from DrugReservation reservation where reservation.drug_reservation_id = ?1")
    DrugReservation findDrugReservationById(UUID id);
}

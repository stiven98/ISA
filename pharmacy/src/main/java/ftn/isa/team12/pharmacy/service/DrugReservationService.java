package ftn.isa.team12.pharmacy.service;
import ftn.isa.team12.pharmacy.domain.drugs.DrugReservation;
import ftn.isa.team12.pharmacy.dto.DrugReservationDTO;
import java.util.List;
import java.util.UUID;

public interface DrugReservationService {

    DrugReservation createDrugReservation(DrugReservationDTO drugReservationDTO);
    List<DrugReservation> findDrugReservationByPatient(String patientEmail);
    DrugReservation cancelReservation(UUID id);
}
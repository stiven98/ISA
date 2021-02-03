package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.common.DateRange;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.drugs.DrugInPharmacy;
import ftn.isa.team12.pharmacy.domain.drugs.DrugReservation;
import ftn.isa.team12.pharmacy.domain.enums.ReservationStatus;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.dto.DrugReservationDTO;
import ftn.isa.team12.pharmacy.repository.DrugInPharmacyRepository;
import ftn.isa.team12.pharmacy.repository.DrugReservationRepository;
import ftn.isa.team12.pharmacy.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class DrugReservationServiceImpl implements DrugReservationService {

    @Autowired
    private DrugReservationRepository drugReservationRepository;

    @Autowired
    private PharmacyService pharmacyService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private DrugService drugService;

    @Autowired
    private DrugInPharmacyRepository drugInPharmacyRepository;

    @Override
    public DrugReservation createDrugReservation(DrugReservationDTO drugReservationDTO) {
        if(drugReservationDTO.getDeadline().before(new Date())){
            throw new IllegalArgumentException("Bad input date");
        }
        DrugReservation drugReservation = new DrugReservation();
        Drug drug = this.drugService.findById(drugReservationDTO.getDrugId());
        Pharmacy pharmacy = this.pharmacyService.findPharmacyById(drugReservationDTO.getPharmacyId());
        Patient patient = this.patientService.findByEmail(drugReservationDTO.getPatientEmail());
        DateRange dateRange = new DateRange();
        dateRange.setStartDate(new Date());
        dateRange.setEndDate(drugReservationDTO.getDeadline());
        drugReservation.setPatient(patient);
        drugReservation.setPharmacy(pharmacy);
        drugReservation.setQuantity(drugReservationDTO.getQuantity());
        drugReservation.setReservationStatus(ReservationStatus.created);
        drugReservation.setReservationDateRange(dateRange);
        drugReservation.setDrug(drug);
        this.drugReservationRepository.save(drugReservation);

        DrugInPharmacy drugInPharmacy = this.drugInPharmacyRepository.findDrugInPharmacy(drug.getDrugId(),pharmacy.getId());
        int beforeRes = drugInPharmacy.getQuantity();
        int newQuantity = beforeRes - drugReservationDTO.getQuantity();
        drugInPharmacy.setQuantity(newQuantity);
        this.drugInPharmacyRepository.save(drugInPharmacy);
        return drugReservation;
    }

    @Override
    public List<DrugReservation> findDrugReservationByPatient(String patientEmail) {
        Patient patient = this.patientService.findByEmail(patientEmail);
        List<DrugReservation> drugReservations = this.drugReservationRepository.findAllByPatientUserId(patient.getUserId());
        return drugReservations;
    }

    @Override
    public DrugReservation cancelReservation(UUID id) {
        DrugReservation drugReservation =  this.drugReservationRepository.findDrugReservationByDrug_reservation_id(id);
        drugReservation.setReservationStatus(ReservationStatus.cancelled);
        this.drugReservationRepository.save(drugReservation);
        return drugReservation;
    }
}

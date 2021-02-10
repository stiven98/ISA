package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.common.DateRange;
import ftn.isa.team12.pharmacy.domain.common.LoyaltyProgram;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.drugs.DrugInPharmacy;
import ftn.isa.team12.pharmacy.domain.drugs.DrugReservation;
import ftn.isa.team12.pharmacy.domain.enums.ReservationStatus;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.dto.DrugReservationDTO;
import ftn.isa.team12.pharmacy.email.EmailSender;
import ftn.isa.team12.pharmacy.repository.DrugInPharmacyRepository;
import ftn.isa.team12.pharmacy.repository.DrugReservationRepository;
import ftn.isa.team12.pharmacy.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class DrugReservationServiceImpl implements DrugReservationService {

    @Autowired
    private DrugReservationRepository drugReservationRepository;

    @Autowired
    private EmailSender sender;

    @Autowired
    private PharmacyService pharmacyService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private LoyaltyProgramService loyaltyProgramService;

    @Autowired
    private DrugService drugService;

    @Autowired
    private DrugInPharmacyRepository drugInPharmacyRepository;

    @Override
    public DrugReservation createDrugReservation(DrugReservationDTO drugReservationDTO) {
        Patient patient = this.patientService.findByEmail(drugReservationDTO.getPatientEmail());
        if(drugReservationDTO.getDeadline().before(new Date())){
            throw new IllegalArgumentException("Bad input date");
        }
        if(patient.getPenalties() > 2) {
            throw new IllegalArgumentException("You have 3 or more penalties and you cant reserve drug");
        }
        LoyaltyProgram lp = this.loyaltyProgramService.getLoyaltyProgram();
        double discount = lp.getDiscountByCategory(patient.getCategory().getCategory());
        DrugReservation drugReservation = new DrugReservation();
        Drug drug = this.drugService.findById(drugReservationDTO.getDrugId());
        Pharmacy pharmacy = this.pharmacyService.findPharmacyById(drugReservationDTO.getPharmacyId());
        DateRange dateRange = new DateRange();
        dateRange.setStartDate(new Date());
        dateRange.setEndDate(drugReservationDTO.getDeadline());
        drugReservation.setPatient(patient);
        drugReservation.setPharmacy(pharmacy);
        drugReservation.setQuantity(drugReservationDTO.getQuantity());
        drugReservation.setReservationStatus(ReservationStatus.created);
        drugReservation.setReservationDateRange(dateRange);
        drugReservation.setDrug(drug);
        drugReservation.setPrice(drugReservationDTO.getPrice());
        discount = (1.0 * discount/100) * drugReservation.getPrice();
        BigDecimal bd1 = new BigDecimal(discount).setScale(2, RoundingMode.HALF_UP);
        double nr = bd1.doubleValue();
        drugReservation.setDiscount(nr);
        drugReservation = this.drugReservationRepository.save(drugReservation);

        DrugInPharmacy drugInPharmacy = this.drugInPharmacyRepository.findDrugInPharmacy(drug.getDrugId(),pharmacy.getId());
        int beforeRes = drugInPharmacy.getQuantity();
        int newQuantity = beforeRes - drugReservationDTO.getQuantity();
        drugInPharmacy.setQuantity(newQuantity);
        this.drugInPharmacyRepository.save(drugInPharmacy);
        try {
            sender.sendDrugReservationEmail(drugReservation.getDrug_reservation_id(), patient.getLoginInfo().getEmail(), pharmacy.getName(), drugReservationDTO.getDeadline().toString(),
                    drug.getName());
        } catch (Exception e) {
            System.out.println(e);
        }
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

        Calendar calendar = Calendar.getInstance();
        DrugReservation drugReservation = this.drugReservationRepository.findDrugReservationByDrug_reservation_id(id);
        Date deadline = drugReservation.getReservationDateRange().getEndDate();
        calendar.setTime(deadline);
        calendar.add(Calendar.DAY_OF_YEAR, -1);
        Date dayberofedealdine = calendar.getTime();
        if (new Date().before(dayberofedealdine)) {
            drugReservation.setReservationStatus(ReservationStatus.cancelled);
            this.drugReservationRepository.save(drugReservation);
            DrugInPharmacy drugInPharmacy = this.drugInPharmacyRepository.findDrugInPharmacy(drugReservation.getDrug().getDrugId(), drugReservation.getPharmacy().getId());
            int returnQuantity = drugReservation.getQuantity();
            int currentQuantity = drugInPharmacy.getQuantity();
            int saveQuantity = currentQuantity + returnQuantity;
            drugInPharmacy.setQuantity(saveQuantity);
            this.drugInPharmacyRepository.save(drugInPharmacy);
            return drugReservation;
        } else {
            throw new IllegalArgumentException("You cant cancel reservation 24h before deadline");
        }
    }

    @Override
    public List<Pharmacy> findPharmaciesWherePatientReservedDrugs(String  patientEmail) {
        Patient patient = this.patientService.findByEmail(patientEmail);
        return this.drugReservationRepository.findPharmaciesWherePatientReservedDrugs(patient.getUserId());
    }

    @Override
    public List<Drug> findDrugsPatientReserved(String patientEmail) {
        Patient patient = this.patientService.findByEmail(patientEmail);
        return this.drugReservationRepository.findDrugsPatientReserved(patient.getUserId());
    }
}

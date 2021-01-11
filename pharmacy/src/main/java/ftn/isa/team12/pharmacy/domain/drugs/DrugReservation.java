package ftn.isa.team12.pharmacy.domain.drugs;

import java.util.UUID;

public class DrugReservation {
   private UUID id;
   private UUID drugInPharmacyId;
   private UUID patientId;
   private int quantity;
   private String code;
   private UUID pharmacistId;
   private ReservationDateRange reservationDateRange;

}
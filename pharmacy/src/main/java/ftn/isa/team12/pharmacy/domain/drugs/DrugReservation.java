package ftn.isa.team12.pharmacy.domain.drugs;

import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.domain.users.Pharmacist;

import java.util.UUID;

public class DrugReservation {
   private UUID id;
   private Pharmacy pharmacy;
   private Patient patient;
   private int quantity;
   private String code;
   private Pharmacist pharmacist;
   private ReservationDateRange reservationDateRange;

}
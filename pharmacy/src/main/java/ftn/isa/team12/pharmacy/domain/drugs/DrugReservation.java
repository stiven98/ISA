package ftn.isa.team12.pharmacy.domain.drugs;

import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.domain.users.Pharmacist;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

//@Entity
//@Table(name = "DRUGRESERVATIONS")
public class DrugReservation implements Serializable {
//   @Id
//   @GeneratedValue(generator = "uuid2")
//   @GenericGenerator(name = "uuid2", strategy = "uuid2")
//   @Column(name = "drugReservation_id", nullable = false, unique = true)
   private UUID drugReservationId;

   private Pharmacy pharmacy;
   private Patient patient;
   private int quantity;
   private String code;
   private Pharmacist pharmacist;
   private ReservationDateRange reservationDateRange;

}
package ftn.isa.team12.pharmacy.domain.drugs;

import ftn.isa.team12.pharmacy.domain.enums.DrugOrderStatus;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.UUID;



public class DrugOrder implements Serializable {


   private UUID orderId;

   private Pharmacy pharmacy;

   private DrugOrderStatus drugOrderStatus;

   private Patient patient;

   private Date dateOfCollecting;



}
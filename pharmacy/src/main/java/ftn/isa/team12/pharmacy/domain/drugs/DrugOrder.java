package ftn.isa.team12.pharmacy.domain.drugs;

import ftn.isa.team12.pharmacy.domain.enums.DrugOrderStatus;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;

import java.util.UUID;


public class DrugOrder {
   private UUID id;
   private Pharmacy pharmacy;
   private DrugOrderStatus drugOrderStatus;

}
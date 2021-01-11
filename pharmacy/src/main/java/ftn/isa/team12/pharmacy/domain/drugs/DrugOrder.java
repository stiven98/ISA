package ftn.isa.team12.pharmacy.domain.drugs;

import ftn.isa.team12.pharmacy.domain.enums.DrugOrderStatus;

import java.util.UUID;


public class DrugOrder {
   private UUID id;
   private UUID pharmacyId;
   private DrugOrderStatus drugOrderStatus;

}
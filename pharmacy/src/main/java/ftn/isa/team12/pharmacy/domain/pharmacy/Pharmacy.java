package ftn.isa.team12.pharmacy.domain.pharmacy;

import ftn.isa.team12.pharmacy.domain.common.Location;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;

import java.util.Set;
import java.util.UUID;

public class Pharmacy {

   private UUID id;
   private String name;
   private String description;
   private Double averageMark;
   private Location location;
   private Set<Drug> drugs;

}
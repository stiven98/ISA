package ftn.isa.team12.pharmacy.domain.pharmacy;

import ftn.isa.team12.pharmacy.domain.common.Location;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.drugs.DrugPrice;
import ftn.isa.team12.pharmacy.domain.users.Dermatologist;
import ftn.isa.team12.pharmacy.domain.users.Pharmacist;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "PHARMACIES")
public class Pharmacy {
   @Id
   @GeneratedValue(generator = "uuid2")
   @GenericGenerator(name = "uuid2", strategy = "uuid2")
   @Column(name = "pharmacy_id", nullable = false, unique = true)
   private UUID id;
   @Column(name = "name", nullable = false)
   private String name;
   @Column(name = "description", nullable = false)
   private String description;
   @Column(name = "averagemark", nullable = false)
   private Double averageMark;
   @OneToOne
   @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false)
   private Location location;
   @ManyToMany
   @JoinTable(name = "drugs_in_pharmacies", joinColumns = @JoinColumn(name="pharmacy_id" ,  referencedColumnName  = "pharmacy_id"),
           inverseJoinColumns = @JoinColumn(name = "drug_id", referencedColumnName = "drug_id"))
   private Set<Drug> drugs = new HashSet<Drug>();
   @ManyToMany
   @JoinTable(name = "dermatologists_in_pharmacies", joinColumns = @JoinColumn(name="pharmacy_id" ,  referencedColumnName  = "pharmacy_id"),
           inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"))
   private Set<Dermatologist> dermatologists = new HashSet<Dermatologist>();
   @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "pharmacy")
   private Set<Pharmacist> pharmacists = new HashSet<Pharmacist>();
   @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "pharmacy")
   private Set<DrugPrice> drugPriceList = new HashSet<DrugPrice>();

   public UUID getId() {
      return id;
   }

   public void setId(UUID id) {
      this.id = id;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public String getDescription() {
      return description;
   }

   public void setDescription(String description) {
      this.description = description;
   }

   public Double getAverageMark() {
      return averageMark;
   }

   public void setAverageMark(Double averageMark) {
      this.averageMark = averageMark;
   }

   public Location getLocation() {
      return location;
   }

   public void setLocation(Location location) {
      this.location = location;
   }

   public Set<Drug> getDrugs() {
      return drugs;
   }

   public void setDrugs(Set<Drug> drugs) {
      this.drugs = drugs;
   }

   public Set<Dermatologist> getDermatologists() {
      return dermatologists;
   }

   public void setDermatologists(Set<Dermatologist> dermatologists) {
      this.dermatologists = dermatologists;
   }

   public Set<Pharmacist> getPharmacists() {
      return pharmacists;
   }

   public void setPharmacists(Set<Pharmacist> pharmacists) {
      this.pharmacists = pharmacists;
   }

   public Set<DrugPrice> getDrugPriceList() {
      return drugPriceList;
   }

   public void setDrugPriceList(Set<DrugPrice> drugPriceList) {
      this.drugPriceList = drugPriceList;
   }
}
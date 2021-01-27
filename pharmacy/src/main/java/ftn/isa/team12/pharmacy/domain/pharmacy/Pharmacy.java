package ftn.isa.team12.pharmacy.domain.pharmacy;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import ftn.isa.team12.pharmacy.domain.common.Location;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.drugs.DrugPrice;
import ftn.isa.team12.pharmacy.domain.users.Dermatologist;
import ftn.isa.team12.pharmacy.domain.users.Pharmacist;
import ftn.isa.team12.pharmacy.domain.users.PharmacyAdministrator;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "PHARMACIES")
public class Pharmacy implements Serializable {
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
   @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "locationId")
   @JsonIdentityReference(alwaysAsId = true)
   @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false)
   private Location location;
   @ManyToMany
   @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "drugId")
   @JsonIdentityReference(alwaysAsId = true)
   @JoinTable(name = "drugs_in_pharmacies", joinColumns = @JoinColumn(name="pharmacy_id" ,  referencedColumnName  = "pharmacy_id"),
           inverseJoinColumns = @JoinColumn(name = "drug_id", referencedColumnName = "drug_id"))
   private Set<Drug> drugs = new HashSet<Drug>();
   @ManyToMany
   @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
   @JsonIdentityReference(alwaysAsId = true)
   @JoinTable(name = "dermatologists_in_pharmacies", joinColumns = @JoinColumn(name="pharmacy_id" ,  referencedColumnName  = "pharmacy_id"),
           inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"))
   private Set<Dermatologist> dermatologists = new HashSet<Dermatologist>();

   @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "pharmacy")
   @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
   @JsonIdentityReference(alwaysAsId = true)
   private Set<Pharmacist> pharmacists = new HashSet<Pharmacist>();

   @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "pharmacy")
   @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
   @JsonIdentityReference(alwaysAsId = true)
   private Set<DrugPrice> drugPriceList = new HashSet<DrugPrice>();


   @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "pharmacy")
   @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "examinationPriceId")
   @JsonIdentityReference(alwaysAsId = true)
   private Set<ExaminationPrice> examinationPriceList = new HashSet<ExaminationPrice>();


   @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "pharmacy")
   @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "examinationId")
   @JsonIdentityReference(alwaysAsId = true)
   private Set<Examination> examinations = new HashSet<Examination>();

   @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "pharmacy")
   @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
   @JsonIdentityReference(alwaysAsId = true)
   private Set<PharmacyAdministrator> phAdmins = new HashSet<PharmacyAdministrator>();

}
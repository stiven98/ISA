package ftn.isa.team12.pharmacy.domain.pharmacy;

import ftn.isa.team12.pharmacy.domain.common.Location;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.drugs.DrugPrice;
import ftn.isa.team12.pharmacy.domain.users.Dermatologist;
import ftn.isa.team12.pharmacy.domain.users.Pharmacist;
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
   @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "pharmacy")
   private Set<ExaminationPrice> examinationPriceList = new HashSet<ExaminationPrice>();
   @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "pharmacy")
   private Set<Examination> examinations = new HashSet<Examination>();

}
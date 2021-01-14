package ftn.isa.team12.pharmacy.domain.drugs;
import ftn.isa.team12.pharmacy.domain.enums.*;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.domain.users.Pharmacist;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "DRUGS")
public class Drug implements Serializable {

   @Id
   @GeneratedValue(generator = "uuid2")
   @GenericGenerator(name = "uuid2", strategy = "uuid2")
   @Column(name = "drug_id", nullable = false, unique = true)
   private UUID drugId;

   @Column(name = "name", nullable = false, unique = true)
   private String name;

   @Column(name = "code", nullable = false, unique = true)
   private String code;

   @Column(name = "typeofdrug", nullable = false)
   private TypeOfDrug typeOfDrug;

   @Column(name = "formofdrug", nullable = false)
   private FormOfDrug formOfDrug;

   @ManyToMany(mappedBy = "drugs")
   private Set<Ingredient> ingredients = new HashSet<Ingredient>();

   @ManyToMany(mappedBy = "allergies")
   private Set<Patient> patientsAllergies = new HashSet<Patient>();

   @ManyToMany(mappedBy = "drugs")
   private Set<Pharmacy> pharmacies = new HashSet<Pharmacy>();

   @Column(name = "issuanceregime", nullable = false)
   private IssuanceRegime issuanceRegime;

   @Column(name = "note")
   private String note;

   @ManyToOne
   @JoinColumn(name = "manufacturer_id", referencedColumnName = "manufacturer_id", nullable = false )
   private Manufacturer manufacturer;

   @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "drug")
   private Set<DrugPrice> priceList = new HashSet<DrugPrice>();

   public Set<Patient> getPatientsAllergies() {
      return patientsAllergies;
   }

   public void setPatientsAllergies(Set<Patient> patientsAllergies) {
      this.patientsAllergies = patientsAllergies;
   }

   public Set<DrugPrice> getPriceList() {
      return priceList;
   }

   public void setPriceList(Set<DrugPrice> priceList) {
      this.priceList = priceList;
   }

   public UUID getDrugId() {
      return drugId;
   }

   public void setDrugId(UUID drugId) {
      this.drugId = drugId;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public String getCode() {
      return code;
   }

   public void setCode(String code) {
      this.code = code;
   }

   public TypeOfDrug getTypeOfDrug() {
      return typeOfDrug;
   }

   public void setTypeOfDrug(TypeOfDrug typeOfDrug) {
      this.typeOfDrug = typeOfDrug;
   }

   public FormOfDrug getFormOfDrug() {
      return formOfDrug;
   }

   public void setFormOfDrug(FormOfDrug formOfDrug) {
      this.formOfDrug = formOfDrug;
   }

   public Set<Ingredient> getIngredients() {
      return ingredients;
   }

   public void setIngredients(Set<Ingredient> ingredients) {
      this.ingredients = ingredients;
   }

   public IssuanceRegime getIssuanceRegime() {
      return issuanceRegime;
   }

   public void setIssuanceRegime(IssuanceRegime issuanceRegime) {
      this.issuanceRegime = issuanceRegime;
   }

   public String getNote() {
      return note;
   }

   public void setNote(String note) {
      this.note = note;
   }

   public Manufacturer getManufacturer() {
      return manufacturer;
   }

   public void setManufacturer(Manufacturer manufacturer) {
      this.manufacturer = manufacturer;
   }

   @Override
   public String toString() {
      return "Drug{" +
              "drugId=" + drugId +
              ", name='" + name + '\'' +
              ", code='" + code + '\'' +
              ", typeOfDrug=" + typeOfDrug +
              ", formOfDrug=" + formOfDrug +
              ", ingredients=" + ingredients +
              ", IssuanceRegime=" + issuanceRegime+
              ", note='" + note + '\'' +
              ", manufacturer=" + manufacturer +
              '}';
   }
}
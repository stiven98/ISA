package ftn.isa.team12.pharmacy.domain.drugs;
import ftn.isa.team12.pharmacy.domain.enums.*;
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
   @Column(name = "DRUG_ID", nullable = false, unique = true)
   private UUID drugId;

   @Column(name = "NAME", nullable = false, unique = true)
   private String name;

   @Column(name = "CODE", nullable = false, unique = true)
   private String code;

   @Column(name = "TYPEOFDRUG", nullable = false)
   private TypeOfDrug typeOfDrug;

   @Column(name = "FORMOFDRUG", nullable = false)
   private FormOfDrug formOfDrug;

   @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "drug")
   private Set<IngredientsInDrug> ingredients = new HashSet<IngredientsInDrug>();

   @Column(name = "ISSURANCEREGIME", nullable = false)
   private IssuranceRegime IssuanceRegime;

   @Column(name = "NOTE")
   private String note;

   @ManyToOne
   @JoinColumn(name = "MANUFACTURER_ID", referencedColumnName = "MANUFACTURER_ID", nullable = false )
   private Manufacturer manufacturer;

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

   public Set<IngredientsInDrug> getIngredients() {
      return ingredients;
   }

   public void setIngredients(Set<IngredientsInDrug> ingredients) {
      this.ingredients = ingredients;
   }

   public IssuranceRegime getIssuanceRegime() {
      return IssuanceRegime;
   }

   public void setIssuanceRegime(IssuranceRegime issuanceRegime) {
      IssuanceRegime = issuanceRegime;
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
              ", IssuanceRegime=" + IssuanceRegime +
              ", note='" + note + '\'' +
              ", manufacturer=" + manufacturer +
              '}';
   }
}
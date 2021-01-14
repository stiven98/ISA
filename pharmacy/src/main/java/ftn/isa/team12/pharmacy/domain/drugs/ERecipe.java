package ftn.isa.team12.pharmacy.domain.drugs;

import ftn.isa.team12.pharmacy.domain.users.Patient;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "ERECIPE")
public class ERecipe implements Serializable {

   @Id
   @GeneratedValue(generator = "uuid2")
   @GenericGenerator(name = "uuid2", strategy = "uuid2")
   @Column(name = "erecipe_id", nullable = false, unique = true)
   private UUID eRecipeId;

   @Column(name = "code", nullable = false, unique = true)
   private String code;

   @Basic
   @Temporal(TemporalType.DATE)
   @Column(name = "dateofissuing", nullable = false)
   private Date dateOfIssuing;

   @JoinColumn(name = "patient_id", referencedColumnName = "patient_id", nullable = false)
   private Patient patient;

   @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "eRecipe")
   private Set<ERecipeItem> eRecipeItems = new HashSet<ERecipeItem>();

   public UUID geteRecipeId() {
      return eRecipeId;
   }

   public void seteRecipeId(UUID eRecipeId) {
      this.eRecipeId = eRecipeId;
   }

   public String getCode() {
      return code;
   }

   public void setCode(String code) {
      this.code = code;
   }

   public Date getDateOfIssuing() {
      return dateOfIssuing;
   }

   public void setDateOfIssuing(Date dateOfIssuing) {
      this.dateOfIssuing = dateOfIssuing;
   }

   public Patient getPatient() {
      return patient;
   }

   public void setPatient(Patient patient) {
      this.patient = patient;
   }

   public Set<ERecipeItem> geteRecipeItems() {
      return eRecipeItems;
   }

   public void seteRecipeItems(Set<ERecipeItem> eRecipeItems) {
      this.eRecipeItems = eRecipeItems;
   }
}
package ftn.isa.team12.pharmacy.domain.drugs;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "ERECIPEITEM")
public class ERecipeItem implements Serializable {

   @Id
   @GeneratedValue(generator = "uuid2")
   @GenericGenerator(name = "uuid2", strategy = "uuid2")
   @Column(name = "ITEM_ID", nullable = false, unique = true)
   private UUID itemId;

   @Id
   @ManyToOne
   @JoinColumn(name = "DRUG_ID", referencedColumnName = "DRUG_ID", nullable = false)
   private Drug drug;

   @Id
   @ManyToOne
   @JoinColumn(name = "ERECIPE_ID", referencedColumnName = "ERECIPE_ID", nullable = false)
   private ERecipe eRecipe;

   @Column(name = "QUANTITY", nullable = false)
   private int quantity;

   public UUID getItemId() {
      return itemId;
   }

   public void setItemId(UUID itemId) {
      this.itemId = itemId;
   }

   public Drug getDrug() {
      return drug;
   }

   public void setDrug(Drug drug) {
      this.drug = drug;
   }

   public ERecipe geteRecipe() {
      return eRecipe;
   }

   public void seteRecipe(ERecipe eRecipe) {
      this.eRecipe = eRecipe;
   }

   public int getQuantity() {
      return quantity;
   }

   public void setQuantity(int quantity) {
      this.quantity = quantity;
   }
}
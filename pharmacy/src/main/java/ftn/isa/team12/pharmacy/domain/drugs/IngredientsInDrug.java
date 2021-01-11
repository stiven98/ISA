package ftn.isa.team12.pharmacy.domain.drugs;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "INGREDIENTSINDRUG")
public class IngredientsInDrug implements Serializable {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "INGREDIENTS_ID", nullable = false, unique = true)
    private UUID ingredientsInDrugId;

    @Id
    @ManyToOne
    @JoinColumn(name = "DRUG_ID", referencedColumnName = "DRUG_ID", nullable = false)
    private Drug drug;

    @OneToOne
    @JoinColumn(name = "DRUGING_ID", referencedColumnName = "DRUGING_ID", nullable = false)
    private DrugIngredient drugIngredient;

    public UUID getIngredientsInDrugId() {
        return ingredientsInDrugId;
    }

    public void setIngredientsInDrugId(UUID ingredientsInDrugId) {
        this.ingredientsInDrugId = ingredientsInDrugId;
    }

    public Drug getDrug() {
        return drug;
    }

    public void setDrug(Drug drug) {
        this.drug = drug;
    }

    public DrugIngredient getDrugIngredient() {
        return drugIngredient;
    }

    public void setDrugIngredient(DrugIngredient drugIngredient) {
        this.drugIngredient = drugIngredient;
    }

    @Override
    public String toString() {
        return "IngredientsInDrug{" +
                "ingredientsInDrugId=" + ingredientsInDrugId +
                ", drug=" + drug +
                ", drugIngredient=" + drugIngredient +
                '}';
    }
}

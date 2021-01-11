package ftn.isa.team12.pharmacy.domain.drugs;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "DRUGINGREDIENTS")
public class DrugIngredient implements Serializable {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "DRUGING_ID", nullable = false, unique = true)
    private UUID drugIngredientId;

    @Column(name = "NAME", nullable = false, unique = true)
    private String name;

    public UUID getDrugIngredientId() {
        return drugIngredientId;
    }

    public void setDrugIngredientId(UUID drugIngredientId) {
        this.drugIngredientId = drugIngredientId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

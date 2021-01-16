package ftn.isa.team12.pharmacy.domain.drugs;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "INGREDIENTS")
public class Ingredient implements Serializable {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "ing_id", nullable = false, unique = true)
    private UUID ingredientId;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @ManyToMany
    @JoinTable(name = "drug_ingredients", joinColumns = @JoinColumn(name="ing_id" ,  referencedColumnName  = "ing_id"),
            inverseJoinColumns = @JoinColumn(name = "drug_id", referencedColumnName = "drug_id"))
    private Set<Drug> drugs = new HashSet<Drug>();

}

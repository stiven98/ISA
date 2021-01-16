package ftn.isa.team12.pharmacy.domain.users;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
@Getter
@Setter
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Entity
@Table(name = "PATIENTS")
public class Patient extends User implements Serializable {
    @ManyToMany
    @JoinTable(name = "allergies", joinColumns = @JoinColumn(name="user_id" ,  referencedColumnName  = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "drug_id", referencedColumnName = "drug_id"))
    private Set<Drug> allergies = new HashSet<Drug>();
    @Embedded
    private AccountCategory category;

}
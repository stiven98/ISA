package ftn.isa.team12.pharmacy.domain.users;

import ftn.isa.team12.pharmacy.domain.common.WorkTime;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;

@Entity
//@Inheritance(strategy = InheritanceType.)
@PrimaryKeyJoinColumn(name = "user_id")
@Getter
@Setter
@NoArgsConstructor
@Table(name = "DERMATOLOGISTS")
public class Dermatologist extends MedicalStuff implements Serializable {
    @ManyToMany(mappedBy = "dermatologists")
    private Set<Pharmacy> pharmacies = new HashSet<Pharmacy>();

}
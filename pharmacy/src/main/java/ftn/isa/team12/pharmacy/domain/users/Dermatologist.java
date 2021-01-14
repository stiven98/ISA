package ftn.isa.team12.pharmacy.domain.users;

import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "DERMATOLOGISTS")
public class Dermatologist extends User implements Serializable {
    @ManyToMany(mappedBy = "dermatologists")
    private Set<Pharmacy> pharmacies = new HashSet<Pharmacy>();

}
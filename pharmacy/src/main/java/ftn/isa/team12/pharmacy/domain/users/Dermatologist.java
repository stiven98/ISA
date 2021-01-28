package ftn.isa.team12.pharmacy.domain.users;

import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@Entity
@PrimaryKeyJoinColumn(name = "user_id")
@Table(name = "DERMATOLOGISTS")
public class Dermatologist extends MedicalStuff implements Serializable {
    @ManyToMany(mappedBy = "dermatologists")
    private Set<Pharmacy> pharmacies = new HashSet<Pharmacy>();

}
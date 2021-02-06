package ftn.isa.team12.pharmacy.domain.users;
import ftn.isa.team12.pharmacy.domain.marks.PharmacistMarks;
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


@Getter
@Setter
@NoArgsConstructor
@Entity
@PrimaryKeyJoinColumn(name = "user_id")
@Table(name = "PHARMACISTS")
public class Pharmacist extends MedicalStuff implements Serializable {
    @ManyToOne
    @JoinColumn(name = "pharmacy_id", referencedColumnName = "pharmacy_id", nullable = false)
    private Pharmacy pharmacy;

    @OneToMany(cascade = {ALL}, fetch = LAZY, mappedBy = "pharmacist")
    private Set<PharmacistMarks> pharmacistMarks = new HashSet<PharmacistMarks>();

}

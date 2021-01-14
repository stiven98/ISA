package ftn.isa.team12.pharmacy.domain.users;

import ftn.isa.team12.pharmacy.domain.common.Country;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "PHARMACISTS")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Pharmacist extends User implements Serializable {
    @ManyToOne
    @JoinColumn(name = "pharmacy_id", referencedColumnName = "pharmacy_id", nullable = false)
    private Pharmacy pharmacy;
}
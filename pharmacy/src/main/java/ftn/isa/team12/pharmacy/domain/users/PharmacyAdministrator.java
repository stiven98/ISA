package ftn.isa.team12.pharmacy.domain.users;


import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
@Getter
@Setter
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "PHARMACY_ADMINISTRATORS")
public class PharmacyAdministrator extends User implements Serializable {

    @ManyToOne
    @JoinColumn(name = "pharmacy_id", referencedColumnName = "pharmacy_id", nullable = false)
    private Pharmacy pharmacy;
}
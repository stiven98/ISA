package ftn.isa.team12.pharmacy.domain.users;

import ftn.isa.team12.pharmacy.domain.common.Country;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@PrimaryKeyJoinColumn(name = "user_id")
@Getter
@Setter
@NoArgsConstructor
@Table(name = "PHARMACISTS")
//@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Pharmacist extends MedicalStuff implements Serializable {
    @ManyToOne
    @JoinColumn(name = "pharmacy_id", referencedColumnName = "pharmacy_id", nullable = false)
    private Pharmacy pharmacy;

}
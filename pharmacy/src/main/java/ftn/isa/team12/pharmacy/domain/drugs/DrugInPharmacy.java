package ftn.isa.team12.pharmacy.domain.drugs;


import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "DRUGS_IN_PHARMACY")
public class DrugInPharmacy {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", nullable = false, unique = true)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "drug" ,referencedColumnName = "drug_id")
    private Drug drug;

    @ManyToOne
    @JoinColumn(name = "pharmacy" ,referencedColumnName = "pharmacy_id")
    private Pharmacy pharmacy;

    @Column(name = "quantity")
    private int  quantity;


}

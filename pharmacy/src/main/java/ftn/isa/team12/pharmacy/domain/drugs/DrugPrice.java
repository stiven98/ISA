package ftn.isa.team12.pharmacy.domain.drugs;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ftn.isa.team12.pharmacy.domain.common.DateRange;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "DRUG_PRICES")
public class DrugPrice implements Serializable {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "price_id", nullable = false, unique = true)
    private UUID id;
    @ManyToOne
    @Id
    @JoinColumn(name = "drug_id", referencedColumnName = "drug_id")
    private Drug drug;
    @ManyToOne
    @Id
    @JoinColumn(name = "pharmacy_id", referencedColumnName = "pharmacy_id")
    private Pharmacy pharmacy;
    @Column(name = "price", nullable = false)
    private double price;
    @Embedded
    private DateRange validityPeriod;


}

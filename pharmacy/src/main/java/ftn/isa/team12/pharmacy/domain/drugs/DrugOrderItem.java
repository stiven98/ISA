package ftn.isa.team12.pharmacy.domain.drugs;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "DRUG_ORDER_ITEMS")
public class DrugOrderItem implements Serializable {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "item_id", nullable = false, unique = true)
    private UUID itemId;

    @Id
    @ManyToOne
    @JoinColumn(name = "drug_id", referencedColumnName = "drug_id", nullable = false)
    private Drug drug;

    @Id
    @ManyToOne
    @JoinColumn(name = "drugorder_id", referencedColumnName = "drugorder_id", nullable = false)
    private DrugOrder drugOrder;

    @Column(name = "quantity", nullable = false)
    private int quantity;


}

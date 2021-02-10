package ftn.isa.team12.pharmacy.domain.common;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "loyalty_program")
@Getter
@Setter
@NoArgsConstructor
public class LoyaltyProgram {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", nullable = false, unique = true)
    public UUID id;

    @Column(name = "min_regular", nullable = false)
    public int minRegular;

    @Column(name = "min_silver", nullable = false)
    public int minSilver;

    @Column(name = "min_golden", nullable = false)
    public int minGold;

    @Column(name = "points_per_examination", nullable = false)
    public int pointsPerExamination;

    @Column(name = "points_per_counseling", nullable = false)
    public int pointsPerCounseling;

    @Column(name = "discount_for_regular", nullable = false)
    public int discountForRegular;

    @Column(name = "discount_for_silver", nullable = false)
    public int discountForSilver;

    @Column(name = "discount_for_gold", nullable = false)
    public int discountForGold;

}

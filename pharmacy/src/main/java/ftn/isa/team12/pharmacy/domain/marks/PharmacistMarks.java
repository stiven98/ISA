package ftn.isa.team12.pharmacy.domain.marks;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.domain.users.Pharmacist;
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
@Table(name = "PHARMACIST_MARKS")
public class PharmacistMarks implements Serializable {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "pharmacist_marks_id", nullable = false, unique = true)
    private UUID pharmacistMarksId;

    @Column(name = "mark", nullable = false)
    private Double mark;

    @ManyToOne
    @JoinColumn(name = "patient_id", referencedColumnName = "user_id")
    private Patient patient;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private Pharmacist pharmacist;
}

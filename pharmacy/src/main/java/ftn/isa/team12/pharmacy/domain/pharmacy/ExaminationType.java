package ftn.isa.team12.pharmacy.domain.pharmacy;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "EXAMINATION_TYPES")
public class ExaminationType implements Serializable {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "examination_type_id", nullable = false, unique = true)
    private UUID examinationTypeId;
    @Column(name = "name", nullable = false)
    private String name;

}

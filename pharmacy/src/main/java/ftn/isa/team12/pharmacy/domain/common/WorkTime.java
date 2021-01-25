package ftn.isa.team12.pharmacy.domain.common;

import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.Dermatologist;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.domain.users.Vacation;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
@Entity
@Table(name = "WORK_TIME")
@Getter
@Setter
@NoArgsConstructor
public class WorkTime implements Serializable  {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "work_time_id", nullable = false, unique = true)
    private UUID id;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "startDate" , column = @Column(name = "work_time_start")),
            @AttributeOverride(name = "endDate" , column = @Column(name = "work_time_end"))
    })
    private DateRange dateRange;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "user_id", nullable = false)
    private MedicalStuff employee;
    @ManyToOne
    @JoinColumn(name = "pharmacy_id", referencedColumnName = "pharmacy_id", nullable = false)
    private Pharmacy pharmacy;
    @Embedded
    private WorkWeek workWeek;


}

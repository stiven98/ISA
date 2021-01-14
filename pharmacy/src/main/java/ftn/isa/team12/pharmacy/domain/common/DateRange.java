package ftn.isa.team12.pharmacy.domain.common;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class DateRange {
    @Basic
    @Temporal(TemporalType.DATE)
    @Column(name = "startdate", nullable = false)
    private Date startDate;
    @Basic
    @Temporal(TemporalType.DATE)
    @Column(name = "enddate", nullable = false)
    private Date endDate;

}

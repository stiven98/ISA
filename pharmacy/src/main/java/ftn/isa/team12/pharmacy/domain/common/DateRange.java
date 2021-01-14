package ftn.isa.team12.pharmacy.domain.common;

import javax.persistence.*;
import java.util.Date;

@Embeddable
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

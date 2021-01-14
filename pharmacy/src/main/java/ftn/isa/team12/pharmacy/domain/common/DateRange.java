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

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}

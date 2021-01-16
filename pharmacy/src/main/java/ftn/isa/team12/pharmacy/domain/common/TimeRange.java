package ftn.isa.team12.pharmacy.domain.common;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.Date;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class TimeRange {
    @Basic
    @Column(name = "starttime", nullable = false)
    private LocalTime startTime;
    @Basic
    @Column(name = "endtime", nullable = false)
    private LocalTime endTime;
}

package ftn.isa.team12.pharmacy.domain.common;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class WorkWeek implements Serializable {

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "startTime" , column = @Column(name = "monday_start")),
            @AttributeOverride(name = "endTime" , column = @Column(name = "monday_end"))
    })
    private TimeRange monday;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "startTime" , column = @Column(name = "tuesday_start")),
            @AttributeOverride(name = "endTime" , column = @Column(name = "tuesday_end"))
    })
    private TimeRange tuesday;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "startTime" , column = @Column(name = "wednesday_start")),
            @AttributeOverride(name = "endTime" , column = @Column(name = "wednesday_end"))
    })
    private TimeRange wednesday;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "startTime" , column = @Column(name = "thursday_start")),
            @AttributeOverride(name = "endTime" , column = @Column(name = "thursday_end"))
    })
    private TimeRange thursday;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "startTime" , column = @Column(name = "friday_start")),
            @AttributeOverride(name = "endTime" , column = @Column(name = "friday_end"))
    })
    private TimeRange friday;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "startTime" , column = @Column(name = "saturday_start")),
            @AttributeOverride(name = "endTime" , column = @Column(name = "saturday_end"))
    })
    private TimeRange saturday;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "startTime" , column = @Column(name = "sunday_start")),
            @AttributeOverride(name = "endTime" , column = @Column(name = "sunday_end"))
    })
    private TimeRange sunday;

}


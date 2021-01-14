package ftn.isa.team12.pharmacy.domain.common;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class WorkWeek {

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "startDate" , column = @Column(name = "monday_start")),
            @AttributeOverride(name = "endDate" , column = @Column(name = "monday_end"))
    })
    private DateRange monday;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "startDate" , column = @Column(name = "tuesday_start")),
            @AttributeOverride(name = "endDate" , column = @Column(name = "tuesday_end"))
    })
    private DateRange tuesday;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "startDate" , column = @Column(name = "wednesday_start")),
            @AttributeOverride(name = "endDate" , column = @Column(name = "wednesday_end"))
    })
    private DateRange wednesday;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "startDate" , column = @Column(name = "thursday_start")),
            @AttributeOverride(name = "endDate" , column = @Column(name = "thursday_end"))
    })
    private DateRange thursday;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "startDate" , column = @Column(name = "friday_start")),
            @AttributeOverride(name = "endDate" , column = @Column(name = "friday_end"))
    })
    private DateRange friday;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "startDate" , column = @Column(name = "saturday_start")),
            @AttributeOverride(name = "endDate" , column = @Column(name = "saturday_end"))
    })
    private DateRange saturday;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "startDate" , column = @Column(name = "sunday_start")),
            @AttributeOverride(name = "endDate" , column = @Column(name = "sunday_end"))
    })
    private DateRange sunday;

}


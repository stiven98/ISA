package ftn.isa.team12.pharmacy.dto;

import ftn.isa.team12.pharmacy.domain.common.DateRange;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VacationRequestDTO {
    private Pharmacy pharmacy;
    private DateRange dateRange;
}

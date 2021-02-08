package ftn.isa.team12.pharmacy.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class DrugPriceDTO {
    private UUID idDrug;
    private double price;
    private Date startDate;
    private Date endDate;


    @Override
    public String toString() {
        return "DrugPriceDTO{" +
                "idDrug=" + idDrug +
                ", price=" + price +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }
}

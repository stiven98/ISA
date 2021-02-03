package ftn.isa.team12.pharmacy.dto;

import ftn.isa.team12.pharmacy.domain.enums.FormOfDrug;
import ftn.isa.team12.pharmacy.domain.enums.IssuanceRegime;
import ftn.isa.team12.pharmacy.domain.enums.TypeOfDrug;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DrugSearcDTO {
    private String phAdminEmail;
    private String name;
    private String code;
    private String typeOfDrug;
    private String formOfDrug;
    private String issuanceRegime;
    private String manufactureName;
    private int quantity;
}

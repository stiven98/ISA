package ftn.isa.team12.pharmacy.dto;

import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.drugs.Manufacturer;
import ftn.isa.team12.pharmacy.domain.enums.FormOfDrug;
import ftn.isa.team12.pharmacy.domain.enums.IssuanceRegime;
import ftn.isa.team12.pharmacy.domain.enums.TypeOfDrug;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DrugDTO {

    private UUID id;
    private String name;
    private String code;
    private TypeOfDrug typeOfDrug;
    private FormOfDrug formOfDrug;
    //private Pharmacy pharmacies;
    private IssuanceRegime issuanceRegime;
    private String note;
    private Manufacturer manufacturer;

    public DrugDTO(Drug drug){
        this(drug.getDrugId(),drug.getName(),drug.getCode(),drug.getTypeOfDrug(),drug.getFormOfDrug(),drug.getIssuanceRegime(), drug.getNote(), drug.getManufacturer());
    }



}

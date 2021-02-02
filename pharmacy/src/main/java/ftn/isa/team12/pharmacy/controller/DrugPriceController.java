package ftn.isa.team12.pharmacy.controller;
import ftn.isa.team12.pharmacy.dto.PriceDTO;
import ftn.isa.team12.pharmacy.service.DrugPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping(value = "/api/drugPrice", produces = MediaType.APPLICATION_JSON_VALUE)
public class DrugPriceController {

    @Autowired
    private DrugPriceService drugPriceService;

    @PostMapping ("/price")
    public Double findPharmaciesWithDrug(@RequestBody PriceDTO priceDTO) throws AccessDeniedException {
        return  drugPriceService.getPriceForDrug(priceDTO.getPharmacyId(),priceDTO.getDrugId());
    }
}

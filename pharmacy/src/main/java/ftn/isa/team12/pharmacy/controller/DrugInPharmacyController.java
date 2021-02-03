package ftn.isa.team12.pharmacy.controller;
import ftn.isa.team12.pharmacy.domain.drugs.Drug;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.dto.GetDrugQuantityDTO;
import ftn.isa.team12.pharmacy.service.DrugInPharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/drugInPharmacy", produces = MediaType.APPLICATION_JSON_VALUE)
public class DrugInPharmacyController {

    @Autowired
    private DrugInPharmacyService drugInPharmacyService;

    @GetMapping("/id/{id}")
    public List<Drug> findDrugInPharmacyById(@PathVariable UUID id) throws AccessDeniedException{
        return  drugInPharmacyService.findDrugInPharmacyById(id);
    }
    @GetMapping("/pharmacies/{id}")
    public List<Pharmacy> findPharmaciesWithDrug(@PathVariable UUID id) throws AccessDeniedException{
        return  drugInPharmacyService.findPharmaciesWithDrug(id);
    }

  //  @PreAuthorize("hasAnyRole('ROLE_PATIENT')") // Dodati ostale role
    @PostMapping("/getQuantity")
    public ResponseEntity<?> getQuantity(@RequestBody GetDrugQuantityDTO drugQuantityDTO) {
      int quantity =   this.drugInPharmacyService.findDrugQuantity(drugQuantityDTO.getDrugId(), drugQuantityDTO.getPharmacyId());
        return new ResponseEntity<>(quantity, HttpStatus.OK);
    }
}

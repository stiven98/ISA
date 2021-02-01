package ftn.isa.team12.pharmacy.controller;


import ftn.isa.team12.pharmacy.domain.drugs.DrugOrder;
import ftn.isa.team12.pharmacy.dto.DrugOrderDTO;
import ftn.isa.team12.pharmacy.service.DrugOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/drugOrder", produces = MediaType.APPLICATION_JSON_VALUE)
public class DrugOrderController {

    @Autowired
    private DrugOrderService drugOrderService;

    @PostMapping("/createOrder")
    public ResponseEntity<DrugOrder> createDrugOrder(@RequestBody DrugOrderDTO drugOrder) {
        DrugOrder order = drugOrderService.createDrugOrder(drugOrder);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}

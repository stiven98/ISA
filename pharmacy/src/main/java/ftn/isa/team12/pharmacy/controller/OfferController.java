package ftn.isa.team12.pharmacy.controller;


import ftn.isa.team12.pharmacy.domain.drugs.Offer;
import ftn.isa.team12.pharmacy.domain.users.Supplier;
import ftn.isa.team12.pharmacy.dto.OfferDTO;
import ftn.isa.team12.pharmacy.service.OfferService;
import ftn.isa.team12.pharmacy.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/offer", produces = MediaType.APPLICATION_JSON_VALUE)
public class OfferController {

    @Autowired
    private OfferService offerService;

    @Autowired
    private SupplierService supplierService;

    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @GetMapping("/supplier/{email}")
    public ResponseEntity<List<Offer>> findOfferBySupplier(@PathVariable String email) throws IllegalAccessException {

        Supplier supplier = supplierService.findByEmail(email);
        if (supplier == null) {
            throw new IllegalAccessException("Supplier with email doesn't exist!");
        }

        return new ResponseEntity<>(this.offerService.getOfferByIdSupplier(supplier.getUserId()), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @GetMapping("/{id}/{price}")
    ResponseEntity<Offer> updatePrice(@PathVariable String id, @PathVariable String price) {
        Offer offer = offerService.findById(UUID.fromString(id));
        if (offer == null) {
            throw new IllegalArgumentException("Wrong id!");
        }
        try {
            double newPrice = Double.parseDouble(price);
            offer.setPrice(newPrice);
            offer = offerService.saveAndFlush(offer);
        } catch (Exception e) {
            throw e;
        }


        return new ResponseEntity<>(offer, HttpStatus.OK);

    }

    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @PostMapping("/add")
    public ResponseEntity<Offer> saveOffer(@RequestBody OfferDTO offerRequest) {
        Offer offer = offerService.addOffer(offerRequest);
        return new ResponseEntity<>(offer, HttpStatus.CREATED);
    }
}

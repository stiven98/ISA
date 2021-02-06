package ftn.isa.team12.pharmacy.service.impl;

import ftn.isa.team12.pharmacy.domain.drugs.DrugOrder;
import ftn.isa.team12.pharmacy.domain.drugs.DrugOrderItem;
import ftn.isa.team12.pharmacy.domain.drugs.Offer;
import ftn.isa.team12.pharmacy.domain.enums.OfferStatus;
import ftn.isa.team12.pharmacy.domain.users.Supplier;
import ftn.isa.team12.pharmacy.dto.OfferDTO;
import ftn.isa.team12.pharmacy.repository.OfferRepository;
import ftn.isa.team12.pharmacy.service.DrugOrderService;
import ftn.isa.team12.pharmacy.service.OfferService;
import ftn.isa.team12.pharmacy.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class OfferServiceImpl implements OfferService {

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private SupplierService supplierService;

    @Autowired
    private DrugOrderService drugOrderService;

    @Override
    public List<Offer> getOfferByIdSupplier(UUID id) {
        return offerRepository.getOfferBySupplier(id);
    }

    @Override
    public Offer addOffer(OfferDTO offerRequest) {
        Offer offer = new Offer();
        offer.setStatus(OfferStatus.waiting);
        offer.setPrice(offerRequest.getPrice());
        offer.setDeadline(offerRequest.getDeliveryTime());
        Supplier supplier = supplierService.findByEmail(offerRequest.getEmail());
        if (supplier == null) {
            throw new IllegalArgumentException("Bad email of supplier");
        }

        offer.setSupplier(supplier);
        DrugOrder drugOrder = drugOrderService.findById(offerRequest.getOrderId());
        if (drugOrder == null) {
            throw new IllegalArgumentException("Bad order ID!");
        }

        offer.setDrugOrder(drugOrder);
        return this.offerRepository.saveAndFlush(offer);
    }

    @Override
    public Offer saveAndFlush(Offer offer) {
        return this.offerRepository.saveAndFlush(offer);
    }

    @Override
    public Offer findById(UUID id) {
        return this.offerRepository.findById(id).get();
    }
}

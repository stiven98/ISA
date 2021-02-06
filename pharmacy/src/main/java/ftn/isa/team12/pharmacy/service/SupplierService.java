package ftn.isa.team12.pharmacy.service;

import ftn.isa.team12.pharmacy.domain.users.Supplier;
import ftn.isa.team12.pharmacy.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;

public interface SupplierService {

    Supplier saveAndFlush(Supplier supplierRequest);
    Supplier findByEmail(String email);
}

package ftn.isa.team12.pharmacy.service.impl;

import ftn.isa.team12.pharmacy.domain.users.Supplier;
import ftn.isa.team12.pharmacy.repository.SupplierRepository;
import ftn.isa.team12.pharmacy.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public Supplier saveAndFlush(Supplier supplierRequest) {
        return this.supplierRepository.saveAndFlush(supplierRequest);
    }
}

package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.users.Supplier;
import ftn.isa.team12.pharmacy.repository.SupplierRepository;
import ftn.isa.team12.pharmacy.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Supplier saveAndFlush(Supplier supplierRequest) {
        supplierRequest.setPassword(passwordEncoder.encode(supplierRequest.getPassword()));
        supplierRequest.getAccountInfo().setFirstLogin(true);
        supplierRequest.getAccountInfo().setActive(false);
        return this.supplierRepository.saveAndFlush(supplierRequest);
    }

    @Override
    public Supplier findByEmail(String email) {
        return this.supplierRepository.findByEmail(email);
    }
}

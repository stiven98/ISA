package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.repository.PharmacyRepository;
import ftn.isa.team12.pharmacy.service.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class PharmacyServiceImpl implements PharmacyService {

    @Autowired
    private PharmacyRepository pharmacyRepository;


    @Override
    public List<Pharmacy> findAll() {
        return pharmacyRepository.findAll();
    }

    @Override
    public Pharmacy findPharmacyByName(String name) {
        return pharmacyRepository.findPharmacyByName(name);
    }

    @Override
    public Pharmacy findPharmacyById(UUID id) {
        return pharmacyRepository.findPharmacyById(id);
    }

    @Override
    public Pharmacy saveAndFlush(Pharmacy pharmacyRequest) {
        pharmacyRequest.setAverageMark(0.0);
        return this.pharmacyRepository.saveAndFlush(pharmacyRequest);
    }
}

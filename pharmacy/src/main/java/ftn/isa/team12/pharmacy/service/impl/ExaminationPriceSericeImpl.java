package ftn.isa.team12.pharmacy.service.impl;


import ftn.isa.team12.pharmacy.domain.pharmacy.ExaminationPrice;
import ftn.isa.team12.pharmacy.domain.users.PharmacyAdministrator;
import ftn.isa.team12.pharmacy.repository.ExaminationPriceRepository;
import ftn.isa.team12.pharmacy.service.ExaminationPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ExaminationPriceSericeImpl  implements ExaminationPriceService{


    @Autowired
    ExaminationPriceRepository examinationPriceRepository;


    @Override
    public List<ExaminationPrice> getAllByValideDate() {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        PharmacyAdministrator pharmacyAdministrator = (PharmacyAdministrator) currentUser.getPrincipal();
        return examinationPriceRepository.getAll(pharmacyAdministrator.getPharmacy(),new Date());
    }
}

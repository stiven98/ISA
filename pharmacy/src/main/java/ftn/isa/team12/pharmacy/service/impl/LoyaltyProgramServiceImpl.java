package ftn.isa.team12.pharmacy.service.impl;

import ftn.isa.team12.pharmacy.domain.common.LoyaltyProgram;
import ftn.isa.team12.pharmacy.repository.LoyaltyProgramRepository;
import ftn.isa.team12.pharmacy.service.LoyaltyProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = false)
public class LoyaltyProgramServiceImpl implements LoyaltyProgramService {

    @Autowired
    private LoyaltyProgramRepository loyaltyProgramRepository;

    @Override
    public LoyaltyProgram saveAndFlush(LoyaltyProgram loyaltyProgram) {
        // update all patient and loyalty status

        return this.loyaltyProgramRepository.saveAndFlush(loyaltyProgram);
    }

    @Override
    public LoyaltyProgram getLoyaltyProgram() {
        return this.loyaltyProgramRepository.findAll().get(0);
    }
}

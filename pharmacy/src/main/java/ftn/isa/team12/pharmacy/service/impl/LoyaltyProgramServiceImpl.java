package ftn.isa.team12.pharmacy.service.impl;

import ftn.isa.team12.pharmacy.domain.common.LoyaltyProgram;
import ftn.isa.team12.pharmacy.repository.LoyaltyProgramRepository;
import ftn.isa.team12.pharmacy.service.LoyaltyProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoyaltyProgramServiceImpl implements LoyaltyProgramService {

    @Autowired
    private LoyaltyProgramRepository loyaltyProgramRepository;

    @Override
    public LoyaltyProgram saveAndFlush(LoyaltyProgram loyaltyProgram) {
        return null;
    }

    @Override
    public LoyaltyProgram getLoyaltyProgram(LoyaltyProgram loyaltyProgram) {
        return this.loyaltyProgramRepository.findById(loyaltyProgram.getId()).get();
    }
}

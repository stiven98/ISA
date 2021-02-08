package ftn.isa.team12.pharmacy.service.impl;

import ftn.isa.team12.pharmacy.domain.common.Complaint;
import ftn.isa.team12.pharmacy.dto.ComplaintDTO;
import ftn.isa.team12.pharmacy.repository.ComplaintRepository;
import ftn.isa.team12.pharmacy.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    public Complaint saveAndFlush(ComplaintDTO complaintRequest) {

        System.out.print(complaintRequest);
        return null;
    }
}

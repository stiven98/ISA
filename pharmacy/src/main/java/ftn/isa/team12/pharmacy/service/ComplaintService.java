package ftn.isa.team12.pharmacy.service;

import ftn.isa.team12.pharmacy.domain.common.Complaint;
import ftn.isa.team12.pharmacy.dto.ComplaintDTO;

public interface ComplaintService {

    Complaint saveAndFlush(ComplaintDTO complaintRequest);
}

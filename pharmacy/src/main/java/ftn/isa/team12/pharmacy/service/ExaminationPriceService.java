package ftn.isa.team12.pharmacy.service;

import ftn.isa.team12.pharmacy.domain.pharmacy.ExaminationPrice;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface ExaminationPriceService {


    List<ExaminationPrice> getAllByValideDate();

}

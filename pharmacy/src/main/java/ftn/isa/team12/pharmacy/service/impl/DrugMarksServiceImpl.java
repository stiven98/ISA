package ftn.isa.team12.pharmacy.service.impl;

import ftn.isa.team12.pharmacy.service.DrugMarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DrugMarksServiceImpl implements DrugMarksService {

    @Autowired
    private DrugMarksService drugMarksService;
}

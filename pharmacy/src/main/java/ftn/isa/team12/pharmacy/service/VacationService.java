package ftn.isa.team12.pharmacy.service;

import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.MedicalStuff;
import ftn.isa.team12.pharmacy.domain.users.Vacation;

import java.util.Date;
import java.util.List;

public interface VacationService {

    List<Vacation> checkVacationDay(Pharmacy pharmacy, Date date, MedicalStuff medicalStuff);



}

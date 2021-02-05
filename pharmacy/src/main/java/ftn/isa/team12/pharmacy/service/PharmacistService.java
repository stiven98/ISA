package ftn.isa.team12.pharmacy.service;

import ftn.isa.team12.pharmacy.domain.common.Location;
import ftn.isa.team12.pharmacy.domain.common.WorkTime;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.Pharmacist;
import ftn.isa.team12.pharmacy.dto.EmployeesCreateDTO;
import ftn.isa.team12.pharmacy.dto.EmployeesDTO;
import ftn.isa.team12.pharmacy.dto.EmployeesSearchDTO;

import java.util.List;
import java.util.Set;

public interface PharmacistService {

    List<EmployeesDTO> findAllPharmacist();
    List<EmployeesDTO> findAllByPhADmin(String email);
    List<EmployeesDTO> searchPharmacist(EmployeesSearchDTO searchDTO);
    List<Pharmacist> serachByPatient(EmployeesSearchDTO searchDTO);
    List<Pharmacist> serachByPhAdmin(EmployeesSearchDTO searchDTO);
    List<Pharmacist> search(EmployeesSearchDTO searchDTO , List<Pharmacist> dermatologists);
    Pharmacist createPharmacist(EmployeesCreateDTO dto);
    Set<WorkTime> createWorkTime(EmployeesCreateDTO dto, Pharmacy pharmacy, Pharmacist pharmacist);
    boolean validation(EmployeesCreateDTO dto);


}

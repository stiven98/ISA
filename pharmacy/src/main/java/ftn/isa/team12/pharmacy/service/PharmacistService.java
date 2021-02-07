package ftn.isa.team12.pharmacy.service;
import ftn.isa.team12.pharmacy.domain.users.Pharmacist;
import ftn.isa.team12.pharmacy.dto.EmployeesDTO;
import ftn.isa.team12.pharmacy.dto.EmployeesSearchDTO;

import java.util.List;

public interface PharmacistService {

    List<EmployeesDTO> findAllPharmacist();
    List<EmployeesDTO> findAllByPhADmin(String email);
    List<EmployeesDTO> searchPharmacist(EmployeesSearchDTO searchDTO);
    List<Pharmacist> serachByPatient(EmployeesSearchDTO searchDTO);
    List<Pharmacist> serachByPhAdmin(EmployeesSearchDTO searchDTO);
    List<Pharmacist> search(EmployeesSearchDTO searchDTO , List<Pharmacist> dermatologists);

}

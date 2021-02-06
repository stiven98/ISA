package ftn.isa.team12.pharmacy.service;

import ftn.isa.team12.pharmacy.domain.users.Dermatologist;
import ftn.isa.team12.pharmacy.dto.EmployeesDTO;
import ftn.isa.team12.pharmacy.dto.EmployeesSearchDTO;


import java.util.List;
import java.util.UUID;

public interface DermatologistService {


    Dermatologist saveAndFlush(Dermatologist dermatologistRequest);
    Dermatologist findById(UUID userId);
    Dermatologist findByEmail(String email);
    List<EmployeesDTO> findAllDermatologist();
    List<EmployeesDTO> findAllByPhAdmin(String email);
    List<EmployeesDTO> searchDermatologist(EmployeesSearchDTO searchDTO);
    List<Dermatologist> searchByPatient(EmployeesSearchDTO searchDTO);
    List<Dermatologist> searchByPhAdmin(EmployeesSearchDTO searchDTO);
    List<Dermatologist> search(EmployeesSearchDTO searchDTO , List<Dermatologist> dermatologists);
}



package ftn.isa.team12.pharmacy.service.impl;

import ftn.isa.team12.pharmacy.domain.users.Dermatologist;
import ftn.isa.team12.pharmacy.repository.DermatologistRepository;
import ftn.isa.team12.pharmacy.service.DermatologistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.PharmacyAdministrator;
import ftn.isa.team12.pharmacy.dto.EmployeesDTO;
import ftn.isa.team12.pharmacy.dto.EmployeesSearchDTO;
import ftn.isa.team12.pharmacy.dto.PharmacyDTO;
import ftn.isa.team12.pharmacy.service.PharmacyAdministratorService;

import java.util.ArrayList;
import java.util.List;


@Service
public class DermatologistServiceImpl implements DermatologistService {

    @Autowired
    private DermatologistRepository dermatologistRepository;


    @Override
    public Dermatologist saveAndFlush(Dermatologist dermatologistRequest) {
        return this.dermatologistRepository.saveAndFlush(dermatologistRequest);
    }

    @Override
    public Dermatologist findById(UUID userId) {
        return this.dermatologistRepository.findDermatologistById(userId);
    }
    @Autowired
    private PharmacyAdministratorService pharmacyAdministratorService;

    @Override
    public List<EmployeesDTO> findAllDermatologist() {
        List<EmployeesDTO> list = new ArrayList<>();
        for(Dermatologist der : dermatologistRepository.findAll()){
            List<PharmacyDTO> phList = new ArrayList<>();
            for(Pharmacy ph : der.getPharmacies())
                    phList.add(new PharmacyDTO(ph));
            list.add(new EmployeesDTO(der,phList));
        }
        return list;
    }

    @Override
    public List<EmployeesDTO> findAllByPhAdmin(String email) {
        PharmacyAdministrator phAdmin = pharmacyAdministratorService.findAdminByEmail(email);
        List<EmployeesDTO> list = new ArrayList<>();
        for(Dermatologist der : phAdmin.getPharmacy().getDermatologists()){
            List<PharmacyDTO> phList = new ArrayList<>();
            for(Pharmacy ph : der.getPharmacies())
                phList.add(new PharmacyDTO(ph));
            list.add(new EmployeesDTO(der,phList));
        }
        return list;
    }

    @Override
    public List<EmployeesDTO> searchDermatologist(EmployeesSearchDTO searchDTO) {
        List<EmployeesDTO> dto = new ArrayList<>();
        List<Dermatologist> list;

        if(searchDTO.getEmail().equals("") && searchDTO.getRole().equals(""))
            throw new IllegalArgumentException("Bad input for search");

        if(searchDTO.getRole().equals("ROLE_PATIENT"))
            list = this.searchByPatient(searchDTO);
        else
            list = this.searchByPhAdmin(searchDTO);

        for(Dermatologist der : list){
            List<PharmacyDTO> phList = new ArrayList<>();
            for(Pharmacy ph : der.getPharmacies())
                phList.add(new PharmacyDTO(ph));
            dto.add(new EmployeesDTO(der,phList));
        }

        return dto;
    }

    @Override
    public List<Dermatologist> searchByPatient(EmployeesSearchDTO searchDTO) {
        List<Dermatologist> list = dermatologistRepository.findAll();
        return this.search(searchDTO,list);
    }

    @Override
    public List<Dermatologist> searchByPhAdmin(EmployeesSearchDTO searchDTO) {
        PharmacyAdministrator phAdmin = pharmacyAdministratorService.findAdminByEmail(searchDTO.getEmail());
        return this.search(searchDTO, new ArrayList<>(phAdmin.getPharmacy().getDermatologists()));
    }

    @Override
    public List<Dermatologist> search(EmployeesSearchDTO searchDTO, List<Dermatologist> dermatologists) {
        List<Dermatologist> list = new ArrayList<>();
        for (Dermatologist der : dermatologists){
            if(!searchDTO.getName().equals("") && !searchDTO.getLastName().equals(""))
                if(der.getAccountInfo().getLastName().equals(searchDTO.getLastName()) && der.getAccountInfo().getName().equals(searchDTO.getName()))
                    list.add(der);
            if(searchDTO.getName().equals("") && !searchDTO.getLastName().equals(""))
                if(der.getAccountInfo().getLastName().equals(searchDTO.getLastName()))
                    list.add(der);
            if(!searchDTO.getName().equals("") && searchDTO.getLastName().equals(""))
                if(der.getAccountInfo().getName().equals(searchDTO.getName()))
                    list.add(der);
        }
        return list;

    }
}

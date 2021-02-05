package ftn.isa.team12.pharmacy.service.impl;

import ftn.isa.team12.pharmacy.domain.users.Dermatologist;
import ftn.isa.team12.pharmacy.domain.users.Pharmacist;
import ftn.isa.team12.pharmacy.domain.users.PharmacyAdministrator;
import ftn.isa.team12.pharmacy.dto.EmployeesDTO;
import ftn.isa.team12.pharmacy.dto.EmployeesSearchDTO;
import ftn.isa.team12.pharmacy.dto.PharmacyDTO;
import ftn.isa.team12.pharmacy.repository.PharmacistRepository;
import ftn.isa.team12.pharmacy.service.PharmacistService;
import ftn.isa.team12.pharmacy.service.PharmacyAdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PharmacistServiceImpl implements PharmacistService {

    @Autowired
    private PharmacistRepository pharmacistRepository;

    @Autowired
    private PharmacyAdministratorService pharmacyAdministratorService;

    @Override
    public Pharmacist findByEmail(String email) {
        return this.pharmacistRepository.findByLoginInfoEmail(email);
    }

    @Override
    public List<EmployeesDTO> findAllPharmacist() {
        List<EmployeesDTO> list = new ArrayList<>();
        for(Pharmacist pharmacist : pharmacistRepository.findAll()){
            List<PharmacyDTO> phList = new ArrayList<>();
            phList.add(new PharmacyDTO(pharmacist.getPharmacy()));
            list.add(new EmployeesDTO(pharmacist,phList));
        }
        return list;
    }

    @Override
    public List<EmployeesDTO> findAllByPhADmin(String email) {
        PharmacyAdministrator phAdmin = pharmacyAdministratorService.findAdminByEmail(email);
        List<EmployeesDTO> list = new ArrayList<>();
        for(Pharmacist pharmacist : phAdmin.getPharmacy().getPharmacists()){
            List<PharmacyDTO> phList = new ArrayList<>();
                phList.add(new PharmacyDTO(pharmacist.getPharmacy()));
            list.add(new EmployeesDTO(pharmacist,phList));
        }
        return list;
    }

    @Override
    public List<EmployeesDTO> searchPharmacist(EmployeesSearchDTO searchDTO) {
        List<EmployeesDTO> dto = new ArrayList<>();
        List<Pharmacist> list;

        if(searchDTO.getEmail().equals("") && searchDTO.getRole().equals(""))
            throw new IllegalArgumentException("Bad input for search");

        if(searchDTO.getRole().equals("ROLE_PATIENT"))
            list = this.serachByPatient(searchDTO);
        else
            list = this.serachByPhAdmin(searchDTO);

        for(Pharmacist pharmacist : list){
            List<PharmacyDTO> phList = new ArrayList<>();
                phList.add(new PharmacyDTO(pharmacist.getPharmacy()));
            dto.add(new EmployeesDTO(pharmacist,phList));
        }
        return dto;
    }

    @Override
    public List<Pharmacist> serachByPatient(EmployeesSearchDTO searchDTO) {
        List<Pharmacist> list = pharmacistRepository.findAll();
        return this.search(searchDTO,list);
    }

    @Override
    public List<Pharmacist> serachByPhAdmin(EmployeesSearchDTO searchDTO) {
        PharmacyAdministrator phAdmin = pharmacyAdministratorService.findAdminByEmail(searchDTO.getEmail());
        return this.search(searchDTO, new ArrayList<>(phAdmin.getPharmacy().getPharmacists()));
    }

    @Override
    public List<Pharmacist> search(EmployeesSearchDTO searchDTO, List<Pharmacist> pharmacist) {
        List<Pharmacist> list = new ArrayList<>();
        for (Pharmacist phar : pharmacist){
            if(!searchDTO.getName().equals("") && !searchDTO.getLastName().equals(""))
                if(phar.getAccountInfo().getLastName().equals(searchDTO.getLastName()) && phar.getAccountInfo().getName().equals(searchDTO.getName()))
                    list.add(phar);
            if(searchDTO.getName().equals("") && !searchDTO.getLastName().equals(""))
                if(phar.getAccountInfo().getLastName().equals(searchDTO.getLastName()))
                    list.add(phar);
            if(!searchDTO.getName().equals("") && searchDTO.getLastName().equals(""))
                if(phar.getAccountInfo().getName().equals(searchDTO.getName()))
                    list.add(phar);
        }
        return list;
    }
}
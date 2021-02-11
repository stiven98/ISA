package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.enums.ExaminationStatus;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.dto.PharmacySearchDTO;
import ftn.isa.team12.pharmacy.repository.PharmacyRepository;
import ftn.isa.team12.pharmacy.service.ExaminationService;
import ftn.isa.team12.pharmacy.service.PatientService;
import ftn.isa.team12.pharmacy.service.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PharmacyServiceImpl implements PharmacyService {

    @Autowired
    private PharmacyRepository pharmacyRepository;

    @Autowired
    private ExaminationService examinationService;

    @Autowired
    private PatientService patientService;

    @Override
    public List<Pharmacy> findAll() {
        return pharmacyRepository.findAll();
    }

    @Override
    public Pharmacy findPharmacyByName(String name) {
        return pharmacyRepository.findPharmacyByName(name);
    }

    @Override
    public Pharmacy findPharmacyById(UUID id) {
        return pharmacyRepository.findPharmacyById(id);
    }

    @Override
    public Pharmacy saveAndFlush(Pharmacy pharmacyRequest) {
        pharmacyRequest.setAverageMark(0.0);
        return this.pharmacyRepository.saveAndFlush(pharmacyRequest);
    }

    @Override
    public Pharmacy saveDrugInPharmacy(Pharmacy pharmacy) {
        return pharmacyRepository.save(pharmacy);
    }

    @Override
    public Pharmacy save(Pharmacy pharmacy) {
        return this.pharmacyRepository.save(pharmacy);
    }



    @Override
    public List<Pharmacy> searchPharmacies(List<Pharmacy> pharmacies, PharmacySearchDTO dto) {
        List<Pharmacy> searchedPharmacies = new ArrayList<>();
        if (dto.getPharmacyName().equals("") && dto.getPharmacyCity().equals("")  && dto.getPharmacyMark() == 0.0) {
            throw new IllegalArgumentException("You must enter a parameter to search");
        }

        if(!dto.getPharmacyName().equals("") && !dto.getPharmacyCity().equals("") && dto.getPharmacyMark() != 0 ) {
            searchedPharmacies.addAll(combinedSearch(dto.getPharmacyName(), dto.getPharmacyCity(), dto.getPharmacyMark(), pharmacies));
        }
        else if( !dto.getPharmacyName().equals("")  && !dto.getPharmacyCity().equals("") ) {
            searchedPharmacies.addAll(nameAndCity(dto.getPharmacyName(), dto.getPharmacyCity(), pharmacies));
        }
        else if( !dto.getPharmacyName().equals("") && dto.getPharmacyMark() != 0 ) {
            searchedPharmacies.addAll(nameAndMark(dto.getPharmacyName(), dto.getPharmacyMark(), pharmacies));
        }
        else if( !dto.getPharmacyCity().equals("") && dto.getPharmacyMark() != 0 ) {
            searchedPharmacies.addAll(cityAndMark(dto.getPharmacyCity(), dto.getPharmacyMark(), pharmacies));
        }
        else if( !dto.getPharmacyName().equals("")) {
           searchedPharmacies.addAll(searchPharmaciesByName(dto.getPharmacyName(), pharmacies));
        }
        else if( !dto.getPharmacyCity().equals("")) {
            searchedPharmacies.addAll(searchPharmaciesByCity(dto.getPharmacyCity(),pharmacies));
        }
        else if(dto.getPharmacyMark() != 0) {
            searchedPharmacies.addAll(searchPharmaciesByMark(dto.getPharmacyMark(), pharmacies));
        }
        return searchedPharmacies;
    }

    public List<Pharmacy> searchPharmaciesByName(String pharmacyName, List<Pharmacy> pharmacies) {
        ArrayList<Pharmacy> searched = new ArrayList<>();
        for(Pharmacy pharmacy : pharmacies) {
            if(pharmacy.getName().contains(pharmacyName)) {
                searched.add(pharmacy);
            }
        }
        return searched;
    }

    public List<Pharmacy> searchPharmaciesByCity(String city, List<Pharmacy> pharmacies) {
        ArrayList<Pharmacy> searched = new ArrayList<>();

        for(Pharmacy pharmacy : pharmacies) {
            if(pharmacy.getLocation().getCityName().contains(city)) {
                searched.add(pharmacy);
            }
        }
        return searched;
    }
    public List<Pharmacy> searchPharmaciesByMark(Double mark, List<Pharmacy> pharmacies) {
        ArrayList<Pharmacy> searched = new ArrayList<>();
        for(Pharmacy pharmacy : pharmacies) {
            if(pharmacy.getAverageMark() >= mark) {
                searched.add(pharmacy);
            }
        }
        return searched;
    }
    public List<Pharmacy> combinedSearch(String name, String city,Double mark, List<Pharmacy> pharmacies) {
        ArrayList<Pharmacy> searched = new ArrayList<>();
        for(Pharmacy pharmacy : pharmacies) {
            if(pharmacy.getAverageMark() >= mark && pharmacy.getName().contains(name) && pharmacy.getLocation().getCityName().contains(city)) {
                searched.add(pharmacy);
            }
        }
        return searched;
    }
    public List<Pharmacy> nameAndCity(String name, String city, List<Pharmacy> pharmacies) {
        ArrayList<Pharmacy> searched = new ArrayList<>();
        for(Pharmacy pharmacy : pharmacies) {
            if(pharmacy.getName().contains(name) && pharmacy.getLocation().getCityName().contains(city)) {
                searched.add(pharmacy);
            }
        }
        return searched;
    }
    public List<Pharmacy> nameAndMark(String name,Double mark, List<Pharmacy> pharmacies) {
        ArrayList<Pharmacy> searched = new ArrayList<>();
        for(Pharmacy pharmacy : pharmacies) {
            if(pharmacy.getAverageMark() >= mark && pharmacy.getName().contains(name)) {
                searched.add(pharmacy);
            }
        }
        return searched;
    }
    public List<Pharmacy> cityAndMark(String city,Double mark, List<Pharmacy> pharmacies) {
        ArrayList<Pharmacy> searched = new ArrayList<>();
        for(Pharmacy pharmacy : pharmacies) {
            if(pharmacy.getAverageMark() >= mark && pharmacy.getLocation().getCityName().contains(city)) {
                searched.add(pharmacy);
            }
        }
        return searched;
    }

}

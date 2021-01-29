package ftn.isa.team12.pharmacy.service.impl;

import ftn.isa.team12.pharmacy.domain.common.City;
import ftn.isa.team12.pharmacy.repository.CityRepository;
import ftn.isa.team12.pharmacy.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServiceImpl implements CityService {

    @Autowired
    private CityRepository cityRepository;

    @Override
    public List<City> findAll() { return this.cityRepository.findAll(); }

    @Override
    public City saveAndFlush(City city) {
        City existsCity = this.cityRepository.findByNameAndCountryId(city.getName(), city.getCountry().getCountryId());
        if (existsCity == null) {
            existsCity = this.cityRepository.saveAndFlush(city);
        }
        return existsCity;
    }
}
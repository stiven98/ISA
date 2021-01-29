package ftn.isa.team12.pharmacy.service.impl;

import ftn.isa.team12.pharmacy.domain.common.Country;
import ftn.isa.team12.pharmacy.repository.CountryRepository;
import ftn.isa.team12.pharmacy.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {

    @Autowired
    private CountryRepository countryRepository;

    @Override
    public List<Country> findAll() { return this.countryRepository.findAll(); }

    @Override
    public Country saveAndFlush(Country country) {
        Country existsCountry = this.countryRepository.findByName(country.getName());
        if (existsCountry == null) {
            existsCountry = this.countryRepository.saveAndFlush(country);
        }
        return existsCountry;
    }
}
package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.common.Country;
import ftn.isa.team12.pharmacy.repository.CountryRepository;
import ftn.isa.team12.pharmacy.service.CountryService;
import ftn.isa.team12.pharmacy.validation.CommonValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {

    @Autowired
    private CountryRepository countryRepository;

    private CommonValidation commonValidation;



    @Override
    public List<Country> findAll() { return this.countryRepository.findAll(); }



    @Override
    public Country saveAndFlush(Country country) {
        commonValidation = new CommonValidation(country.getName());
        //regex prolazi Beograd ili Novi Sad morate prva slovo velikim
        if(!commonValidation.commonValidationCheck("") || !commonValidation.regexValidation("^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}$"))
            throw new IllegalArgumentException("Bad input");

        Country existsCountry = this.countryRepository.findByName(country.getName());
        if (existsCountry == null) {
            existsCountry = this.countryRepository.saveAndFlush(country);
        }
        return existsCountry;
    }







}

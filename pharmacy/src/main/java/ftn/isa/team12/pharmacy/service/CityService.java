package ftn.isa.team12.pharmacy.service;
import ftn.isa.team12.pharmacy.domain.common.City;
import java.util.List;

public interface CityService {

    List<City> findAll();
    City saveAndFlush(City city);
}

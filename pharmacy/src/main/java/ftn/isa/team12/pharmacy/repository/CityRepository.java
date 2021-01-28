package ftn.isa.team12.pharmacy.repository;

import ftn.isa.team12.pharmacy.domain.common.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CityRepository extends JpaRepository<City, UUID> {
}

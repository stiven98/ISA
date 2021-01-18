package ftn.isa.team12.pharmacy;

import ftn.isa.team12.pharmacy.domain.common.Address;
import ftn.isa.team12.pharmacy.domain.common.Country;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

@SpringBootApplication
public class PharmacyApplication {

	public static void main(String[] args) {

		SpringApplication.run(PharmacyApplication.class, args);

	}

}

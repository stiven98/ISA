package ftn.isa.team12.pharmacy.domain.common;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Test {

        public static void main(String[] args) throws Exception {
            Logger.getLogger("").setLevel(Level.OFF);
            final EntityManagerFactory factory =
                    Persistence.createEntityManagerFactory("PharmacyDB");
            EntityManager em = factory.createEntityManager();

            Address address = new Address();
            address.setNumber(10);
            address.setStreet("Karadjordjeva");

            Country country = new Country();
            country.setName("Srbija");

            City city  = new City();
            city.setName("Novi Sad");
            city.setCountry(country);
            city.setZipCode(21000);

            Location location = new Location();
            location.setAddress(address);
           // location.setCountry(country);
            location.setCity(city);

            em.getTransaction().begin();
            em.persist(country);
            em.persist(city);
            em.persist(location);
            em.getTransaction().commit();
            em.close();

            System.exit(0);
        }
    }


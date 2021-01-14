package ftn.isa.team12.pharmacy.domain.drugs;
import ftn.isa.team12.pharmacy.domain.common.Address;
import ftn.isa.team12.pharmacy.domain.common.City;
import ftn.isa.team12.pharmacy.domain.common.Country;
import ftn.isa.team12.pharmacy.domain.common.Location;
import ftn.isa.team12.pharmacy.domain.enums.FormOfDrug;
import ftn.isa.team12.pharmacy.domain.enums.IssuanceRegime;
import ftn.isa.team12.pharmacy.domain.enums.TypeOfDrug;
import ftn.isa.team12.pharmacy.domain.users.AccountInfo;
import ftn.isa.team12.pharmacy.domain.users.Dermatologist;
import ftn.isa.team12.pharmacy.domain.users.LoginInfo;

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
        location.setCity(city);

        Manufacturer manufacturer = new Manufacturer();
        manufacturer.setName("Bayer");

        Ingredient drugIngreditent = new Ingredient();
        drugIngreditent.setName("Sastojak01");

        Drug drug = new Drug();
        drug.setName("Aspirin");
        drug.setCode("123DROGA123");
        drug.setTypeOfDrug(TypeOfDrug.herbalMedicine);
        drug.setFormOfDrug(FormOfDrug.pill);
        drug.setManufacturer(manufacturer);
        drug.setIssuanceRegime(IssuanceRegime.withoutRecipe);

        AccountInfo accountInfo = new AccountInfo();
        accountInfo.setName("Aca");
        accountInfo.setLastName("Simic");
        accountInfo.setActive(true);
        accountInfo.setPhoneNumber("06344346");
        accountInfo.setFirstLogin(false);

        LoginInfo loginInfo = new LoginInfo();
        loginInfo.setEmail("aca@faca.com");
        loginInfo.setPassword("acafaca");


        Dermatologist dermatologist = new Dermatologist();
        dermatologist.setLocation(location);
        dermatologist.setAccountInfo(accountInfo);
        dermatologist.setLoginInfo(loginInfo);


        em.getTransaction().begin();
        em.persist(country);
        em.persist(city);
        em.persist(location);
        em.persist(manufacturer);
        em.persist(drugIngreditent);
        System.out.println("***************************************************************************************************************************");
        System.out.println(drug);
        em.persist(drug);
        em.persist(dermatologist);
        em.getTransaction().commit();
        em.close();

        System.exit(0);
    }
}

package ftn.isa.team12.pharmacy.domain.drugs;
import ftn.isa.team12.pharmacy.domain.common.*;
import ftn.isa.team12.pharmacy.domain.enums.FormOfDrug;
import ftn.isa.team12.pharmacy.domain.enums.IssuanceRegime;
import ftn.isa.team12.pharmacy.domain.enums.TypeOfDrug;
import ftn.isa.team12.pharmacy.domain.enums.UserCategory;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.Date;
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

        Address address1 = new Address();
        address1.setNumber(10);
        address1.setStreet("Masarikova");

        Country country = new Country();
        country.setName("Srbija");

        City city  = new City();
        city.setName("Novi Sad");
        city.setCountry(country);
        city.setZipCode(21000);

        Location location = new Location();
        location.setAddress(address);
        location.setCity(city);

        Location location1 = new Location();
        location1.setAddress(address1);
        location1.setCity(city);

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

        Date startDate = new Date();
        Date endDate = new Date(2021,01,25);
        DateRange dateRange = new DateRange();
        dateRange.setStartDate(startDate);
        dateRange.setEndDate(endDate);

        Pharmacy pharmacy = new Pharmacy();
        pharmacy.setName("Apoteka 1");
        pharmacy.setLocation(location1);
        pharmacy.setDescription("Dobra apoteka");
        pharmacy.setAverageMark(8.9);
        pharmacy.getDrugs().add(drug);


        DrugPrice drugPrice = new DrugPrice();
        drugPrice.setPrice(560.0);
        drugPrice.setDrug(drug);
        //drugPrice.setPharmacy(pharmacy);
        drugPrice.setValidityPeriod(dateRange);

     //   pharmacy.getDrugPriceList().add(drugPrice);
        AccountCategory accounCategory = new AccountCategory();
        accounCategory.setCategory(UserCategory.gold);
        accounCategory.setPoints(12);

        Patient patient = new Patient();
        patient.setLocation(location1);
        patient.setLoginInfo(loginInfo);
        patient.setAccountInfo(accountInfo);
        patient.setCategory(accounCategory);

        ERecipe eRecipe = new ERecipe();
        eRecipe.setPatient(patient);
        eRecipe.setDateOfIssuing(startDate);
        eRecipe.setCode("123456675");

        ERecipeItem eRecipeItem = new ERecipeItem();
        eRecipeItem.setQuantity(12);
        eRecipeItem.setDrug(drug);
        eRecipeItem.seteRecipe(eRecipe);
        eRecipe.geteRecipeItems().add(eRecipeItem);



        em.getTransaction().begin();
        em.persist(country);
        em.persist(city);
        em.persist(location);
        em.persist(location1);
        em.persist(manufacturer);
        em.persist(drugIngreditent);
        em.persist(drug);
       // em.persist(drugPrice);
        em.persist(patient);
        em.persist(eRecipe);
        //em.persist(eRecipeItem);

//        em.persist(pharmacy);
        em.persist(dermatologist);
        em.getTransaction().commit();
        em.close();

        System.exit(0);
    }
}

package ftn.isa.team12.pharmacy.domain.drugs;
import ftn.isa.team12.pharmacy.domain.common.*;
import ftn.isa.team12.pharmacy.domain.enums.*;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.pharmacy.ExaminationPrice;
import ftn.isa.team12.pharmacy.domain.pharmacy.ExaminationType;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.*;
import org.hibernate.jdbc.Work;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.time.LocalTime;
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

        Address address2 = new Address();
        address2.setNumber(20);
        address2.setStreet("Kisacka");

        Country country = new Country();
        country.setName("Srbija");

        City city  = new City();
        city.setName("Novi Sad");
        city.setCountry(country);
        city.setZipCode(21000);

        City city1  = new City();
        city1.setName("Beograd");
        city1.setCountry(country);
        city1.setZipCode(11000);

        Location location = new Location();
        location.setAddress(address);
        location.setCity(city);

        Location location1 = new Location();
        location1.setAddress(address1);
        location1.setCity(city1);

        Location location2 = new Location();
        location2.setAddress(address2);
        location2.setCity(city);

        AccountInfo accountInfo4 = new AccountInfo();
        accountInfo4.setActive(false);
        accountInfo4.setFirstLogin(false);
        accountInfo4.setName("Marko");
        accountInfo4.setLastName("Markovic");
        accountInfo4.setPhoneNumber("000330303032");

        LoginInfo loginInfo4 = new LoginInfo();
        loginInfo4.setEmail("marko@gmail.com");
        loginInfo4.setPassword("marko");

        PharmacyAdministrator pharmacyAdministrator = new PharmacyAdministrator();
        pharmacyAdministrator.setAccountInfo(accountInfo4);
        pharmacyAdministrator.setLocation(location1);
        pharmacyAdministrator.setLoginInfo(loginInfo4);


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

        AccountInfo accountInfo1 = new AccountInfo();
        accountInfo1.setName("Aleksandar");
        accountInfo1.setLastName("Stevanović");
        accountInfo1.setActive(true);
        accountInfo1.setPhoneNumber("06125446");
        accountInfo1.setFirstLogin(false);

        AccountInfo accountInfo2 = new AccountInfo();
        accountInfo2.setName("Djordjije");
        accountInfo2.setLastName("Kundacina");
        accountInfo2.setActive(true);
        accountInfo2.setPhoneNumber("06685446");
        accountInfo2.setFirstLogin(false);

        LoginInfo loginInfo = new LoginInfo();
        loginInfo.setEmail("aca@faca.com");
        loginInfo.setPassword("acafaca");

        LoginInfo loginInfo1 = new LoginInfo();
        loginInfo1.setEmail("maca@faca.com");
        loginInfo1.setPassword("macafaca");

        LoginInfo loginInfo2 = new LoginInfo();
        loginInfo2.setEmail("a@faca.com");
        loginInfo2.setPassword("afaca");



        Dermatologist dermatologist = new Dermatologist();
        dermatologist.setLocation(location2);
        dermatologist.setAccountInfo(accountInfo);
        dermatologist.setLoginInfo(loginInfo);

        Pharmacist pharmacist = new Pharmacist();
        pharmacist.setLocation(location1);
        pharmacist.setLoginInfo(loginInfo2);
        pharmacist.setAccountInfo(accountInfo2);


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
        pharmacy.getDermatologists().add(dermatologist);
        pharmacist.setPharmacy(pharmacy);

        DrugPrice drugPrice = new DrugPrice();
        drugPrice.setPrice(560.0);
        drugPrice.setDrug(drug);
        drugPrice.setPharmacy(pharmacy);
        drugPrice.setValidityPeriod(dateRange);

        AccountCategory accounCategory = new AccountCategory();
        accounCategory.setCategory(UserCategory.gold);
        accounCategory.setPoints(12);

        Patient patient = new Patient();
        patient.setLocation(location1);
        patient.setLoginInfo(loginInfo1);
        patient.setAccountInfo(accountInfo1);
        patient.setCategory(accounCategory);

        ERecipe eRecipe = new ERecipe();
        eRecipe.setPatient(patient);
        eRecipe.setDateOfIssuing(startDate);
        eRecipe.setCode("123456675");


        ERecipeItem eRecipeItem = new ERecipeItem();
        eRecipeItem.setQuantity(12);
        eRecipeItem.setDrug(drug);
        eRecipeItem.setERecipe(eRecipe);

        ERecipeItem eRecipeItem1 = new ERecipeItem();
        eRecipeItem1.setQuantity(14);
        eRecipeItem1.setDrug(drug);
        eRecipeItem1.setERecipe(eRecipe);

        eRecipe.getERecipeItems().add(eRecipeItem);
        eRecipe.getERecipeItems().add(eRecipeItem1);


        DrugReservation drugReservation = new DrugReservation();
        drugReservation.setCode("Rezervacija123");
        drugReservation.setPatient(patient);
        drugReservation.setPharmacy(pharmacy);
        drugReservation.setQuantity(5);
        drugReservation.setReservationStatus(ReservationStatus.created);
        drugReservation.setReservationDateRange(dateRange);

        drugReservation.setDrug(drug);

        LocalTime t =  LocalTime.of(8,0);
        LocalTime t1 = LocalTime.of(16,0);

        TimeRange timeRange = new TimeRange();
        timeRange.setStartTime(t);
        timeRange.setEndTime(t1);


        WorkWeek workWeek = new WorkWeek();
        workWeek.setSaturday(timeRange);
        workWeek.setMonday(timeRange);
        workWeek.setTuesday(timeRange);
        workWeek.setWednesday(timeRange);
        workWeek.setThursday(timeRange);
        workWeek.setFriday(timeRange);
        workWeek.setSunday(timeRange);



        WorkTime workTime = new WorkTime();
        workTime.setWorkWeek(workWeek);
        workTime.setPharmacy(pharmacy);
        workTime.setEmployee(dermatologist);
        workTime.setDateRange(dateRange);

        WorkTime workTime1 = new WorkTime();
        workTime1.setWorkWeek(workWeek);
        workTime1.setPharmacy(pharmacy);
        workTime1.setEmployee(pharmacist);
        workTime1.setDateRange(dateRange);

        pharmacyAdministrator.setPharmacy(pharmacy);
        DrugOrder drugOrder = new DrugOrder();
        drugOrder.setDrugOrderStatus(DrugOrderStatus.processed);
        drugOrder.setPharmacy(pharmacy);
        drugOrder.setDeadline(new Date());
        drugOrder.setPharmacyAdministrator(pharmacyAdministrator);

        DrugOrderItem drugOrderItem = new DrugOrderItem();
        drugOrderItem.setQuantity(5);
        drugOrderItem.setDrug(drug);
        drugOrderItem.setDrugOrder(drugOrder);

        DrugOrderItem drugOrderItem1 = new DrugOrderItem();
        drugOrderItem1.setQuantity(10);
        drugOrderItem1.setDrug(drug);
        drugOrderItem1.setDrugOrder(drugOrder);

        drugOrder.getDrugOrderItems().add(drugOrderItem);
        drugOrder.getDrugOrderItems().add(drugOrderItem1);

        Supplier supplier = new Supplier();
        supplier.setLocation(location1);
        supplier.setAccountInfo(accountInfo4);
        supplier.setLoginInfo(loginInfo2);
        supplier.getAvailableDrugs().add(drug);

        Offer offer = new Offer();
        offer.setStatus(OfferStatus.accepted);
        offer.setDeadline(new Date());
        offer.setPrice(10);
        offer.setSupplier(supplier);
        offer.setDrugOrder(drugOrder);

        ExaminationType examinationType = new ExaminationType();
        examinationType.setName("Consulting");

        ExaminationPrice examinationPrice = new ExaminationPrice();
        examinationPrice.setPrice(3000.0);
        examinationPrice.setExaminationType(examinationType);
        examinationPrice.setPharmacy(pharmacy);
        examinationPrice.setDateOfValidity(dateRange);

        Examination examination = new Examination();
        examination.setEmployee(pharmacist);
        examination.setPatient(patient);
        examination.setExaminationPrice(examinationPrice);
        examination.setDateOfExamination(new Date());
        examination.setTimeOfExamination(LocalTime.of(13,45));
        examination.setDuration(45);
        examination.setPharmacy(pharmacy);

        pharmacy.getExaminationPriceList().add(examinationPrice);
        pharmacy.getExaminations().add(examination);

        Vacation vacation = new Vacation();
        vacation.setEmployee(pharmacist);
        vacation.setDateRange(dateRange);

        pharmacist.getVacations().add(vacation);

        em.getTransaction().begin();
        em.persist(country);
        em.persist(city);
        em.persist(city1);
        em.persist(location);
        em.persist(location1);
        em.persist(location2);
        em.persist(manufacturer);
        em.persist(drugIngreditent);
        em.persist(drug);
        em.persist(examinationType);
        em.persist(examinationPrice);
        em.persist(pharmacy);
        em.persist(dermatologist);
        em.persist(drugPrice);
        em.persist(patient);
        em.persist(eRecipe);
        em.persist(drugReservation);
        em.persist(workTime);
        em.persist(pharmacist);
        em.persist(workTime1);
        em.persist(pharmacyAdministrator);
        em.persist(drugOrder);
        em.persist(supplier);
        em.persist(offer);
        em.getTransaction().commit();
        em.close();

        System.exit(0);
    }
}

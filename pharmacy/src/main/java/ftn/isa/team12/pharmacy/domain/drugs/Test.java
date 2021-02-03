package ftn.isa.team12.pharmacy.domain.drugs;
import ftn.isa.team12.pharmacy.domain.common.*;
import ftn.isa.team12.pharmacy.domain.enums.*;
import ftn.isa.team12.pharmacy.domain.pharmacy.Examination;
import ftn.isa.team12.pharmacy.domain.pharmacy.ExaminationPrice;
import ftn.isa.team12.pharmacy.domain.pharmacy.ExaminationType;
import ftn.isa.team12.pharmacy.domain.pharmacy.Pharmacy;
import ftn.isa.team12.pharmacy.domain.users.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Test {



    public static void main(String[] args) throws Exception {
        Logger.getLogger("").setLevel(Level.OFF);
        final EntityManagerFactory factory =
                Persistence.createEntityManagerFactory("PharmacyDB");
        EntityManager em = factory.createEntityManager();


        Authority a = new Authority();
        a.setRole("ROLE_PH_ADMIN");

        Authority derm = new Authority();
        derm.setRole("ROLE_DERMATOLOGIST");

        Authority pa = new Authority();
        pa.setRole("ROLE_PATIENT");

        Authority sa = new Authority();
        sa.setRole("ROLE_SYSTEM_ADMINISTRATOR");

        List<Authority> authorities = new ArrayList<Authority>();
        List<Authority> authorities2 = new ArrayList<Authority>();
        List<Authority> authoritiesDerm = new ArrayList<>();
        List<Authority> authoritiesSysAdmin = new ArrayList<>();

        authorities.add(pa);
        authorities2.add(a);
        authoritiesDerm.add(derm);
        authoritiesSysAdmin.add(sa);

        Address addressSysAdmin = new Address();
        addressSysAdmin.setStreet("Bulevar Despota Stefana");
        addressSysAdmin.setNumber(7);


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

        Location locationSysAdmin = new Location();
        locationSysAdmin.setCity(city);
        locationSysAdmin.setAddress(addressSysAdmin);

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
        accountInfo4.setActive(true);
        accountInfo4.setFirstLogin(false);
        accountInfo4.setName("Marko");
        accountInfo4.setLastName("Markovic");
        accountInfo4.setPhoneNumber("000330303032");

        LoginInfo loginInfo4 = new LoginInfo();
        loginInfo4.setEmail("marko@gmail.com");
        //marko
        loginInfo4.setPassword("$2y$10$Z5f1FLfPOnoUy30IFf45f.HI.hJFejU3oHGB0xd2ol5pjhBdllfZa");

        AccountInfo accountInfoSysAdmin = new AccountInfo();
        accountInfoSysAdmin.setActive(true);
        accountInfoSysAdmin.setFirstLogin(false);
        accountInfoSysAdmin.setName("Petar");
        accountInfoSysAdmin.setLastName("Petrovic");
        accountInfoSysAdmin.setPhoneNumber("+381-64-333-21-12");

        LoginInfo loginInfoSysAdmin = new LoginInfo();
        loginInfoSysAdmin.setEmail("petar.petrovic@gmail.com");
        loginInfoSysAdmin.setPassword("$2a$10$FCQuRUBQvmjK9JatjRzbaO8ZgmCX/lnr2ycU0ge/r9eT.dZbTcQl6");



        SystemAdministrator systemAdministrator = new SystemAdministrator();
        systemAdministrator.setAccountInfo(accountInfoSysAdmin);
        systemAdministrator.setLocation(locationSysAdmin);

        systemAdministrator.setLoginInfo(loginInfoSysAdmin);
        systemAdministrator.setAuthorities(authoritiesSysAdmin);




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
        drug.setCode("ASP123XXX123");
        drug.setTypeOfDrug(TypeOfDrug.herbalMedicine);
        drug.setFormOfDrug(FormOfDrug.pill);
        drug.setManufacturer(manufacturer);
        drug.setNote("This is note");
        drug.setIssuanceRegime(IssuanceRegime.withoutRecipe);

        Drug drug1 = new Drug();
        drug1.setName("Brufen");
        drug1.setCode("BRUF123XXX123");
        drug1.setTypeOfDrug(TypeOfDrug.herbalMedicine);
        drug1.setFormOfDrug(FormOfDrug.capsule);
        drug1.setManufacturer(manufacturer);
        drug1.setIssuanceRegime(IssuanceRegime.withoutRecipe);

        Drug drug2 = new Drug();
        drug2.setName("Paracetamol");
        drug2.setCode("PAR123XXX123");
        drug2.setTypeOfDrug(TypeOfDrug.herbalMedicine);
        drug2.setFormOfDrug(FormOfDrug.powder);
        drug2.setManufacturer(manufacturer);
        drug2.setIssuanceRegime(IssuanceRegime.withoutRecipe);


        Drug drug3 = new Drug();
        drug3.setName("Andol");
        drug3.setCode("AND123XXX123");
        drug3.setTypeOfDrug(TypeOfDrug.herbalMedicine);
        drug3.setFormOfDrug(FormOfDrug.pill);
        drug3.setManufacturer(manufacturer);
        drug3.setIssuanceRegime(IssuanceRegime.withoutRecipe);

        Drug drug4 = new Drug();
        drug4.setName("Panadol");
        drug4.setCode("PAND123XXX123");
        drug4.setTypeOfDrug(TypeOfDrug.herbalMedicine);
        drug4.setFormOfDrug(FormOfDrug.capsule);
        drug4.setManufacturer(manufacturer);
        drug4.setIssuanceRegime(IssuanceRegime.withoutRecipe);


        Drug drug5 = new Drug();
        drug5.setName("Febricet");
        drug5.setCode("FEB123XXX123");
        drug5.setTypeOfDrug(TypeOfDrug.herbalMedicine);
        drug5.setFormOfDrug(FormOfDrug.powder);
        drug5.setManufacturer(manufacturer);
        drug5.setIssuanceRegime(IssuanceRegime.withoutRecipe);


        Drug drug6 = new Drug();
        drug6.setName("Biofrezee");
        drug6.setCode("BF123XXX123");
        drug6.setTypeOfDrug(TypeOfDrug.herbalMedicine);
        drug6.setFormOfDrug(FormOfDrug.cream);
        drug6.setManufacturer(manufacturer);
        drug6.setIssuanceRegime(IssuanceRegime.withoutRecipe);


        Drug drug7 = new Drug();
        drug7.setName("Pantenol");
        drug7.setCode("PAN123XXX123");
        drug7.setTypeOfDrug(TypeOfDrug.herbalMedicine);
        drug7.setFormOfDrug(FormOfDrug.cream);
        drug7.setManufacturer(manufacturer);
        drug7.setIssuanceRegime(IssuanceRegime.withoutRecipe);

        drug1.setCode("321DROGA321");
        drug1.setTypeOfDrug(TypeOfDrug.herbalMedicine);
        drug1.setFormOfDrug(FormOfDrug.capsule);
        drug1.setManufacturer(manufacturer);
        drug1.setNote("This is note 2");
        drug1.setIssuanceRegime(IssuanceRegime.withRecipe);



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
        //acafaca
        loginInfo.setPassword("$2a$10$PLALH3vbrAY7mZKmndud4.NdDd2eV9TDbreXZV0kOamJA0/MYEMhS");

        LoginInfo loginInfo1 = new LoginInfo();
        loginInfo1.setEmail("maca@faca.com");
        //macafaca
        loginInfo1.setPassword("$2y$10$1fIqu1TMa1nSN40huVlHsePYVeXDIcb.5/lqNLzvSq0nM4p3ZNmIS");

        LoginInfo loginInfo2 = new LoginInfo();
        loginInfo2.setEmail("a@faca.com");
        //afaca
        loginInfo2.setPassword("$2y$10$C9VSEjAKLPEbwSPD7tCjXeVuUSwjp89l59bDtF3LEjD1EJp9qqv5O");

        AccountInfo accountInfo3 = new AccountInfo();
        accountInfo3.setName("Jovan");
        accountInfo3.setLastName("Bosnic");
        accountInfo3.setFirstLogin(false);
        accountInfo3.setPhoneNumber("06134562");

        LoginInfo loginInfo3 = new LoginInfo();
        loginInfo3.setEmail("jovan@gmail.com");
        loginInfo3.setPassword("");




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


        Pharmacy pharmacy2 = new Pharmacy();
        pharmacy2.setName("Apoteka 2");
        pharmacy2.setLocation(location2);
        pharmacy2.setDescription("Nasa apoteka");
        pharmacy2.setAverageMark(8.6);

        Pharmacy pharmacy3 = new Pharmacy();
        pharmacy3.setName("Apoteka 3");
        pharmacy3.setLocation(location);
        pharmacy3.setDescription("Kul apoteka");
        pharmacy3.setAverageMark(9.6);


        Pharmacy pharmacy4 = new Pharmacy();
        pharmacy4.setName("Apoteka 4");
        pharmacy4.setLocation(location);
        pharmacy4.setDescription("Naj apoteka");
        pharmacy4.setAverageMark(9.1);

        Pharmacy pharmacy5 = new Pharmacy();
        pharmacy5.setName("Apoteka 5");
        pharmacy5.setLocation(location);
        pharmacy5.setDescription("Nova apoteka");
        pharmacy5.setAverageMark(8.1);

        Pharmacy pharmacy6 = new Pharmacy();
        pharmacy6.setName("Apoteka 6");
        pharmacy6.setLocation(location);
        pharmacy6.setDescription("Ful apoteka");
        pharmacy6.setAverageMark(8.7);



        Pharmacy pharmacy7 = new Pharmacy();
        pharmacy7.setName("Apoteka 7");
        pharmacy7.setLocation(location2);
        pharmacy7.setDescription("Mnogo dobra apoteka");
        pharmacy7.setAverageMark(9.2);


        Pharmacy pharmacy8 = new Pharmacy();
        pharmacy8.setName("Apoteka 8");
        pharmacy8.setLocation(location1);
        pharmacy8.setDescription("Nasa najbolja apoteka");
        pharmacy8.setAverageMark(9.8);

        pharmacy.getDermatologists().add(dermatologist);
        pharmacist.setPharmacy(pharmacy);

        DrugInPharmacy drugInPharmacy = new DrugInPharmacy();
        drugInPharmacy.setPharmacy(pharmacy);
        drugInPharmacy.setDrug(drug);
        drugInPharmacy.setQuantity(10);
        pharmacy.getDrugs().add(drugInPharmacy);

        DrugPrice drugPrice = new DrugPrice();
        drugPrice.setPrice(560.0);
        drugPrice.setDrug(drug);
        drugPrice.setPharmacy(pharmacy);
        drugPrice.setValidityPeriod(dateRange);

        DrugPrice drugPrice1 = new DrugPrice();
        drugPrice1.setPrice(520.0);
        drugPrice1.setDrug(drug);
        drugPrice1.setPharmacy(pharmacy4);
        drugPrice1.setValidityPeriod(dateRange);

        AccountCategory accounCategory = new AccountCategory();
        accounCategory.setCategory(UserCategory.gold);
        accounCategory.setPoints(12);

        Patient patient = new Patient();
        patient.setLocation(location1);
        patient.setLoginInfo(loginInfo1);
        patient.setAccountInfo(accountInfo1);
        patient.setCategory(accounCategory);
        patient.getAllergies().add(drug);
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

        LoginInfo suplierInfo = new LoginInfo();
        suplierInfo.setEmail("sup@sup.com");
        suplierInfo.setPassword("$2y$10$dGToolHjytPEch4CJNuVP.yEulslPNB0Dsyy.JmTYLE68fyqNz1MC");


        Supplier supplier = new Supplier();
        supplier.setLocation(location1);
        supplier.setAccountInfo(accountInfo4);
        supplier.setLoginInfo(suplierInfo);
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

        DrugInPharmacy drugInPharmacy1 = new DrugInPharmacy();
        drugInPharmacy1.setPharmacy(pharmacy2);
        drugInPharmacy1.setDrug(drug1);
        drugInPharmacy1.setQuantity(12);
        pharmacy2.getDrugs().add(drugInPharmacy1);

        DrugInPharmacy drugInPharmacy3 = new DrugInPharmacy();
        drugInPharmacy3.setPharmacy(pharmacy);
        drugInPharmacy3.setDrug(drug3);
        drugInPharmacy3.setQuantity(78);
        pharmacy.getDrugs().add(drugInPharmacy3);


        DrugInPharmacy drugInPharmacy4 = new DrugInPharmacy();
        drugInPharmacy4.setPharmacy(pharmacy4);
        drugInPharmacy4.setDrug(drug);
        drugInPharmacy4.setQuantity(10);
        pharmacy4.getDrugs().add(drugInPharmacy4);


        patient.setAuthorities(authorities);
        pharmacyAdministrator.setAuthorities(authorities2);
        dermatologist.setAuthorities(authoritiesDerm);

        em.getTransaction().begin();
        em.persist(a);
        em.persist(pa);
        em.persist(derm);
        em.persist(sa);

        em.persist(country);
        em.persist(city);
        em.persist(city1);
        em.persist(location);
        em.persist(location1);
        em.persist(location2);
        em.persist(locationSysAdmin);
        em.persist(manufacturer);
        em.persist(drugIngreditent);
        em.persist(drug);
        em.persist(drug1);
        em.persist(examinationType);
        em.persist(examinationPrice);
        em.persist(pharmacy);
        em.persist(drugInPharmacy);
        em.persist(dermatologist);

        em.persist(systemAdministrator);

        em.persist(drugPrice);
        em.persist(patient);
        em.persist(pharmacy2);
        em.persist(pharmacy3);
        em.persist(pharmacy4);
        em.persist(pharmacy5);
        em.persist(pharmacy6);
        em.persist(pharmacy7);
        em.persist(pharmacy8);
        em.persist(eRecipe);
        em.persist(drugReservation);
        em.persist(workTime);
        em.persist(pharmacist);
        em.persist(workTime1);
        em.persist(pharmacyAdministrator);
        em.persist(drugOrder);
        em.persist(supplier);
        em.persist(offer);
        em.persist(drug1);
        em.persist(drug2);
        em.persist(drug3);
        em.persist(drug4);
        em.persist(drug5);
        em.persist(drug6);
        em.persist(drug7);
        em.persist(drugInPharmacy1);
        em.persist(drugInPharmacy4);
        em.persist(drugInPharmacy3);
        em.persist(drugPrice1);

        em.getTransaction().commit();
        em.close();


        System.exit(0);
    }
}

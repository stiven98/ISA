import { Component, OnInit } from '@angular/core';
import {RegistrationPatientModel} from '../sing-up/registrationPatient.model';
import {ValidationModel} from '../validation-model/validation.model';
import {CityService} from '../services/city.service';
import {CountryService} from '../services/country.service';
import {CreateAccountService} from '../services/createAccount.service';
import {Router} from '@angular/router';
import {PharmacyService} from '../services/pharmacy.service';
import {SysAdminComponent} from '../sys-admin/sys-admin.component';
import {SisAdminService} from '../services/sis-admin.service';
import {PhAdminService} from '../services/ph-admin.service';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.css']
})
export class NewAdminComponent implements OnInit {

  selectedCountry = 'Choose...';
  selectedCity = 'Choose...';
  disabledCountry = false;
  disabledCity = false;
  fetchData = false;
  cities = [];
  countries = [];
  admin: RegistrationPatientModel = new RegistrationPatientModel();
  validationModel: ValidationModel = new ValidationModel();
  ifCountry = false;
  confirmPassword = '';
  addedCountry: string;
  addedCity: string;
  zipCode: string;
  pharmacies = [];
  selectedTypeAdmin = 'Choose...';
  showPharmacy: boolean;
  selectedPharmacyId = 'Choose...';


  constructor(private cityService: CityService,
              private countryService: CountryService,
              private createAccountService: CreateAccountService,
              private router: Router,
              private pharmacyService: PharmacyService,
              private sysAdminService: SisAdminService,
              private phAdminService: PhAdminService) { }


  ngOnInit(): void {
    this.addedCountry = '';
    this.addedCity = '';
    this.zipCode = '';
    this.fetchData = true;
    this.showPharmacy = false;

    this.countryService.findAll().subscribe((response) => {
      this.countries = response;
      this.fetchData = false;
    });
  }

  onChangeSelectedCountry = (event) => {
    this.validationModel = new ValidationModel();
    this.selectedCountry = event.target.value;

    if (this.countries.includes(this.selectedCountry) || this.selectedCountry === 'Other country'){
      this.ifCountry = true;
      this.fetchData = true;
      this.addedCountry = '';
      this.cityService.findAllByCountry(this.selectedCountry).subscribe((response) => {
        this.cities = response;
        this.fetchData = false;
      });
    } else {
      this.ifCountry = false;
      this.cities = [];
    }
    this.disabledCountry = this.selectedCountry === 'Other country';
  }

  onChangeSelectedCity = (event) => {
    this.addedCity = '';
    this.zipCode = '';
    this.validationModel = new ValidationModel();
    this.selectedCity = event.target.value;
    this.disabledCity = this.selectedCity === 'Other city';
  }

  onKeyDown = () => {
    this.validationModel = new ValidationModel();
  }

  createNewAdmin = () => {
    if (this.validateInput()) {
      if (this.countries.includes(this.selectedCountry)) {
        this.admin.location.city.country.name = this.selectedCountry;
      } else {
        this.admin.location.city.country.name = this.addedCountry;
      }

      if (this.cities.includes(this.selectedCity)) {
        this.admin.location.city.name = this.selectedCity;
      } else {
        this.admin.location.city.name = this.addedCity;
        this.admin.location.city.zipCode = this.zipCode;
      }
      this.fetchData = true;

      if (this.selectedTypeAdmin === 'System administrator') {
        this.sysAdminService.saveSysAdmin(this.admin).subscribe((response) => {
          this.fetchData = false;
          this.router.navigate(['/administrators']);
        }, (error) => {
          this.validationModel.validEmail = 'is-invalid';
          this.fetchData = false;
        });
      } else if (this.selectedTypeAdmin === 'Pharmacy administrator') {
        this.fetchData = true;
        this.phAdminService.savePharmacyAdministrator(this.admin, this.selectedPharmacyId).subscribe((resonse) => {
          this.fetchData = false;
          this.router.navigate(['/administrators']);
        }, (error) => {

          this.fetchData = false;
        });
      }
    }

  }

  validateInput = () => {
    const validatedName = this.isValidName();
    const validatedSurname = this.isValidSurname();
    const validatedEmail = this.isValidEmail();
    const validatedPassword = this.isValidPassword();
    const validatedConfirmPassword = this.isValidConfirmPassword();
    const validatedPhoneNumber = this.isValidPhoneNumber();
    const validatedStreet = this.isValidStreet();
    const validatedNumber = this.isValidNumber();
    const validatedCountry = this.isValidCountry();
    const validatedCity = this.isValidCity();
    const validatedAdmin = this.isValidAdmin();
    const validatedPharmacy = this.isValidPharmacy();
    return (validatedName && validatedSurname && validatedEmail && validatedPassword && validatedConfirmPassword && validatedPhoneNumber &&
      validatedStreet && validatedNumber && validatedCountry && validatedCity && validatedAdmin && validatedPharmacy);
  }

  isValidPharmacy = () => {
    if (this.selectedTypeAdmin === 'Pharmacy administrator') {
      if (this.selectedPharmacyId !== 'Choose...') {
        return true;
      } else {
        this.validationModel.validPharmacy = 'is-invalid';
        return false;
      }
    } else {
      return true;
    }
  }

  isValidAdmin = () => {
    if (this.selectedTypeAdmin === 'Choose...') {
      alert(true);
      this.validationModel.validAdmin = 'is-invalid';
      return false;
    }
    return true;
  }

  isValidName = () => {
    if (this.admin.accountInfo.name.length > 0) {return true; }
    else { this.validationModel.validName = 'is-invalid'; return false; }
  }

  isValidSurname = () => {
    if (this.admin.accountInfo.lastName.length > 0) {return true; }
    else { this.validationModel.validSurname = 'is-invalid'; return false; }
  }

  isValidEmail = () => {
    if (!this.admin.loginInfo.email.match(new RegExp('.+(@).+(.com)'))){
      this.validationModel.validEmail = 'is-invalid';
      return false;
    }
    return true;
  }

  isValidPassword = () => {
    let regex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{6,}/g;
    const isPasswordValidFlag = regex.test(this.admin.loginInfo.password);
    if (!isPasswordValidFlag) {this.validationModel.validPassword = 'is-invalid'; return false; }
    return true;
  }

  isValidConfirmPassword = () => {
    if (this.admin.loginInfo.password === this.confirmPassword) {
      return true;
    } else {
      this.validationModel.validConfirmPassword = 'is-invalid';
      return false;
    }
  }

  isValidPhoneNumber = () => {
    if (this.admin.accountInfo.phoneNumber.match(new RegExp('[+][0-9]{3}[-][0-9]{2}[-][0-9]{3}[-][0-9]{2}[-][0-9]{2}'))){
      return true;
    } else {
      this.validationModel.validPhoneNumber = 'is-invalid';
      return false;
    }
  }

  isValidStreet = () => {
    if (this.admin.location.address.street.length > 0) {
      return true;
    } else {
      this.validationModel.validAddress = 'is-invalid';
      return false;
    }
  }

  isValidNumber = () => {
    if (this.admin.location.address.number.match(new RegExp('[0-9]+'))){
      return true;
    } else {
      this.validationModel.validNumber = 'is-invalid';
      return false;
    }
  }

  isValidCountry = () => {
    if (this.selectedCountry === 'Choose...') {
      this.validationModel.validCountry = 'is-invalid';
      return false;
    } else if (this.selectedCountry === 'Other country'){
      if (!this.addedCountry.match('[A-Za-z]+')){
        this.validationModel.validInputCountry = 'is-invalid';
        return false;
      }
    }
    return true;
  }

  isValidCity = () => {
    if (this.selectedCity === 'Choose...'){
      this.validationModel.validCity = 'is-invalid';
      return false;
    } else if (this.selectedCity === 'Other city') {
      let ret = true;
      if (!this.addedCity.match('[A-Za-z]+')) {
        this.validationModel.validInputCity = 'is-invalid';
        ret = false;
      }
      if (!this.zipCode.match('[0-9]+')){
        this.validationModel.validZipCode = 'is-invalid';
        ret = false;
      }
      return ret;
    }
    return true;
  }







  onChangeAdminType = (event) => {
    this.validationModel = new ValidationModel();
    this.selectedTypeAdmin = event.target.value;

    if (this.selectedTypeAdmin === 'Pharmacy administrator'){
      this.showPharmacy = true;
      this.fetchData = true;
      this.pharmacyService.findAll().subscribe((response) => {
        this.pharmacies = response;
        this.fetchData = false;
      });
    } else {



      this.showPharmacy = false;
    }
  }

  onChangePharmacy = (event) => {
    this.selectedPharmacyId = event.target.value;
  }


}

import { Component, OnInit } from '@angular/core';
import {CityService} from '../services/city.service';
import {CountryService} from '../services/country.service';
import {RegistrationPatientModel} from './registrationPatient.model';
import {ValidationModel} from './validation.model';
import {CreateAccountService} from '../services/createAccount.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  selectedCountry = 'Choose...';
  selectedCity = 'Choose...';
  disabledCountry = false;
  disabledCity = false;
  fetchData = false;
  cities = [];
  countries = [];
  registrationPatient: RegistrationPatientModel = new RegistrationPatientModel();
  validationModel: ValidationModel = new ValidationModel();
  ifCountry = false;
  confirmPassword = '';
  addedCountry: string;
  addedCity: string;
  zipCode: string;

  constructor(private cityService: CityService,
              private countryService: CountryService,
              private createAccountService: CreateAccountService) { }

  ngOnInit(): void {
    this.addedCountry = '';
    this.addedCity = '';
    this.zipCode = '';
    this.fetchData = true;

    this.countryService.findAll().subscribe((response) => {
      this.countries = response;
      this.fetchData = false;
    });

  }

  createAccount = () => {
    if (this.validateInput()){
      if (this.countries.includes(this.selectedCountry)){
        this.registrationPatient.location.city.country.name = this.selectedCountry;
      } else {
        this.registrationPatient.location.city.country.name = this.addedCountry;
      }

      if (this.cities.includes(this.selectedCity)) {
        this.registrationPatient.location.city.name = this.selectedCity;
      } else {
        this.registrationPatient.location.city.name = this.addedCity;
        this.registrationPatient.location.city.zipCode = this.zipCode;
      }
      this.fetchData = true;

      console.log(this.registrationPatient);
      this.createAccountService.register(this.registrationPatient).subscribe((response) => {
        alert(response);
        this.fetchData = false;
      });


    } else {
      console.log('Nije dobro');
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
    return (validatedName && validatedSurname && validatedEmail && validatedPassword && validatedConfirmPassword && validatedPhoneNumber &&
          validatedStreet && validatedNumber && validatedCountry && validatedCity);
  }

  isValidName = () => {
    if (this.registrationPatient.accountInfo.name.length > 0) {return true; }
    else { this.validationModel.validName = 'is-invalid'; return false; }
  }

  isValidSurname = () => {
    if (this.registrationPatient.accountInfo.lastName.length > 0) {return true; }
    else { this.validationModel.validSurname = 'is-invalid'; return false; }
  }

  isValidEmail = () => {
    if (!this.registrationPatient.loginInfo.email.match(new RegExp('.+(@).+(.com)'))){
      this.validationModel.validEmail = 'is-invalid';
      return false;
    }
    return true;
  }

  isValidPassword = () => {
    if (this.registrationPatient.loginInfo.password.length < 4) {this.validationModel.validPassword = 'is-invalid'; return false; }
    return true;
  }

  isValidConfirmPassword = () => {
    if (this.registrationPatient.loginInfo.password === this.confirmPassword) {
      return true;
    } else {
      this.validationModel.validConfirmPassword = 'is-invalid';
      return false;
    }
  }

  isValidPhoneNumber = () => {
    if (this.registrationPatient.accountInfo.phoneNumber.match(new RegExp('[+][0-9]{3}[-][0-9]{2}[-][0-9]{3}[-][0-9]{2}[-][0-9]{2}'))){
      return true;
    } else {
      this.validationModel.validPhoneNumber = 'is-invalid';
      return false;
    }
  }

  isValidStreet = () => {
    if (this.registrationPatient.location.address.street.length > 0) {
      return true;
    } else {
      this.validationModel.validAddress = 'is-invalid';
      return false;
    }
  }

  isValidNumber = () => {
    if (this.registrationPatient.location.address.number.match(new RegExp('[0-9]+'))){
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


  onChangeSelectedCountry = (event) => {
    this.validationModel = new ValidationModel();
    this.selectedCountry = event.target.value;

    if (this.countries.includes(this.selectedCountry) || this.selectedCountry === 'Other country'){
      this.ifCountry = true;
      this.fetchData = true;
      this.addedCountry = '';
      this.cityService.findAll(this.selectedCountry).subscribe((response) => {
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

}

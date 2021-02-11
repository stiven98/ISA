import { Component, OnInit } from '@angular/core';
import {RegistrationPatientModel} from '../sing-up/registrationPatient.model';
import {ValidationModel} from '../validation-model/validation.model';
import {CityService} from '../services/city.service';
import {CountryService} from '../services/country.service';
import {Router} from '@angular/router';
import {DermatologistService} from '../services/dermatologist.service';

@Component({
  selector: 'app-new-dermatologist',
  templateUrl: './new-dermatologist.component.html',
  styleUrls: ['./new-dermatologist.component.css']
})
export class NewDermatologistComponent implements OnInit {

  selectedCountry: string;
  selectedCity: string;
  disabledCountry: boolean;
  disabledCity: boolean;
  fetchData: boolean;
  cities: any [];
  countries: any [];
  registrationPatient: RegistrationPatientModel;
  validationModel: ValidationModel;
  ifCountry: boolean;
  confirmPassword: string;
  addedCountry: string;
  addedCity: string;
  zipCode: string;


  constructor(private cityService: CityService,
              private countryService: CountryService,
              private router: Router,
              private dermatologistService: DermatologistService
              ) { }

  ngOnInit(): void {
    this.selectedCountry = 'Choose...';
    this.selectedCity = 'Choose...';
    this.disabledCountry = false;
    this.disabledCity = false;
    this.fetchData = false;
    this.cities = [];
    this.countries = [];
    this.registrationPatient = new RegistrationPatientModel();
    this.validationModel = new ValidationModel();
    this.ifCountry = false;
    this.confirmPassword = '';
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

      this.dermatologistService.saveDermatologist(this.registrationPatient).subscribe((response) => {
        alert('Success added dermatologist!');
        this.ngOnInit();
      }, (error) => {
        this.fetchData = false;
        this.validationModel.validEmail = 'is-invalid';
      });
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
    const regex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{6,}/g;
    const isPasswordValidFlag = regex.test(this.registrationPatient.loginInfo.password);
    if (!isPasswordValidFlag) {this.validationModel.validPassword = 'is-invalid'; return false; }
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
}

import { Component, OnInit } from '@angular/core';
import {ValidationModel} from '../validation-model/validation.model';
import {CityService} from '../services/city.service';
import {CountryService} from '../services/country.service';
import {NewPharmacyModel} from './newPharmacy.model';
import {PharmacyService} from '../services/pharmacy.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-pharmacy',
  templateUrl: './new-pharmacy.component.html',
  styleUrls: ['./new-pharmacy.component.css']
})
export class NewPharmacyComponent implements OnInit {

  selectedCountry = 'Choose...';
  selectedCity = 'Choose...';
  disabledCountry = false;
  disabledCity = false;
  fetchData = false;
  cities = [];
  countries = [];
  ifCountry = false;
  validationModel = new ValidationModel();
  addedCountry: string;
  addedCity: string;
  zipCode: string;
  registration: boolean;
  newPharmacyModel = new NewPharmacyModel();
  errorName = '';



  constructor(private cityService: CityService,
              private countryService: CountryService,
              private pharmacyService: PharmacyService,
              private router: Router) { }

  ngOnInit(): void {
    this.addedCountry = '';
    this.addedCity = '';
    this.zipCode = '';
    this.fetchData = true;
    this.registration = true;

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
    this.errorName = '';
  }

  createNewPharmacy = () => {
    if (this.validateInput()){
      console.log(this.newPharmacyModel);
      if (this.countries.includes(this.selectedCountry)){
        this.newPharmacyModel.location.city.country.name = this.selectedCountry;
      } else {
        this.newPharmacyModel.location.city.country.name = this.addedCountry;
      }

      if (this.cities.includes(this.selectedCity)) {
        this.newPharmacyModel.location.city.name = this.selectedCity;
      } else {
        this.newPharmacyModel.location.city.name = this.addedCity;
        this.newPharmacyModel.location.city.zipCode = this.zipCode;
      }
      this.fetchData = true;

      this.pharmacyService.saveAndFlush(this.newPharmacyModel).subscribe((response) => {
        this.fetchData = false;
        this.router.navigate(['pharmacy-home', this.newPharmacyModel.name]);
      }, (error => {
        this.fetchData = false;
        this.errorName = 'Pharmacy with name already exists!';
      }));

    }
  }

  validateInput = () => {
    const validatedName = this.isValidName();
    const validatedSurname = this.isValidSurname();
    const validatedStreet = this.isValidStreet();
    const validatedNumber = this.isValidNumber();
    const validatedCountry = this.isValidCountry();
    const validatedCity = this.isValidCity();
    return (validatedName && validatedSurname &&
      validatedStreet && validatedNumber && validatedCountry && validatedCity);
}


  isValidName = () => {
    if (this.newPharmacyModel.name.length > 0) {return true; }
    else { this.validationModel.validName = 'is-invalid'; return false; }
  }

  isValidSurname = () => {
    if (this.newPharmacyModel.description.length > 0) {return true; }
    else { this.validationModel.validSurname = 'is-invalid'; return false; }
  }

  isValidStreet = () => {
    if (this.newPharmacyModel.location.address.street.length > 0) {
      return true;
    } else {
      this.validationModel.validAddress = 'is-invalid';
      return false;
    }
  }

  isValidNumber = () => {
    if (this.newPharmacyModel.location.address.number.match(new RegExp('[0-9]+'))){
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

}

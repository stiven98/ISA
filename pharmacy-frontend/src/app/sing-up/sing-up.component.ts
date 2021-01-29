import { Component, OnInit } from '@angular/core';
import {CityService} from '../services/city.service';
import {CountryService} from '../services/country.service';
import {RegistrationPatientModel} from './registrationPatient.model';
import {ValidationModel} from './validation.model';

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

  constructor(private cityService: CityService, private countryService: CountryService) { }

  ngOnInit(): void {
    this.fetchData = true;
    this.cityService.findAll().subscribe((response) => {
      this.cities = response;
    });
    this.countryService.findAll().subscribe((response) => {
      this.countries = response;
    });
    this.fetchData = false;
  }

  createAccount = () => {
    if (this.validateInput()){
      alert('salji request jebo ga ti');
    } else {
      alert('nije dobro');
    }

  }

  validateInput = () => {
    return true;
  }

  onChangeSelectedCountry = (event) => {
    this.selectedCountry = event.target.value;
    this.disabledCountry = this.selectedCountry === 'Other country';
  }

  onChangeSelectedCity = (event) => {
    this.selectedCity = event.target.value;
    this.disabledCity = this.selectedCity === 'Other city';
  }
}

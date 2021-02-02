import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../services/city.service';
import { CountryService } from '../services/country.service';
import { UserService } from '../services/user.service';
import { ChangeUserModel } from './changeUser.model';


@Component({
  selector: 'app-change-account-info',
  templateUrl: './change-account-info.component.html',
  styleUrls: ['./change-account-info.component.css']
})
export class ChangeAccountInfoComponent implements OnInit {
  id;
  onButtonClick = true;
  selectedCountry = 'Choose...';
  selectedCity = 'Choose...';
  disabledCountry = false;
  disabledCity = false;
  cities = [];
  countries = [];
  location: string;
  changeUser: ChangeUserModel = new ChangeUserModel();
  fetchData = false;
  password = '';


  constructor(private userService:UserService,
      private cityService: CityService,
      private countryService: CountryService) {

   }

  ngOnInit(): void {
    this.fetchData = true;
    this.userService.getMyInfo().subscribe(user => this.changeUser=user);
    this.fetchData = false;

  }


  onChangeSelectedCountry = (event) => {
    this.selectedCountry = event.target.value;
    this.changeUser.countryName = this.selectedCountry;
    this.disabledCountry = this.selectedCountry === 'Other country';
    this.cityService.findAllByCountry(this.selectedCountry).subscribe((response) => {
      this.cities = response;
    });
  }

  onChangeSelectedCity = (event) => {
    this.selectedCity = event.target.value;
    this.changeUser.cityName = this.selectedCity;
    this.disabledCity = this.selectedCity === 'Other city';
  }

  changeVisibility = () => {
    this.onButtonClick = false;
    this.fetchData = true;
    this.cityService.findAllByCountry(this.selectedCountry).subscribe((response) => {
      this.cities = response;
    });
    this.countryService.findAll().subscribe((response) => {
      this.countries = response;
    });
    this.fetchData = false;
  }

  changeAccountInfo = () => {
    this.changeUser.password = this.password;
    this.userService.changeAccountInformation(this.changeUser).subscribe((response) => {
      this.changeUser = response;
      this.onButtonClick = true;
    });


  }

}

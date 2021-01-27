import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
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

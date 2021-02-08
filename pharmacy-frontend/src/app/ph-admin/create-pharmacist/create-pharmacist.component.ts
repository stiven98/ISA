import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ChangeUserModel } from '../../change-account-info/changeUser.model';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { MedicalStuffService } from '../../services/medical-stuff.service';
import { UserService } from '../../services/user.service';
import { PharmacistCreateModel } from './PharmacistCreater';
import { WorkTimeModel } from './WorkTime';



@Component({
  selector: 'app-create-pharmacist',
  templateUrl: './create-pharmacist.component.html',
  styleUrls: ['./create-pharmacist.component.css']
})
export class CreatePharmacistComponent implements OnInit {
  model: NgbDateStruct;
  a:Date;
  startTime = {hour: 8, minute: 0};
  endTime = {hour: 16, minute: 0};
  selectedCountry = 'Choose...';
  selectedCity = 'Choose...';
  disabledCountry = false;
  disabledCity = false;
  cities = [];
  countries = [];
  user:ChangeUserModel = new ChangeUserModel();
  changeUser:ChangeUserModel = new ChangeUserModel();
  pharmacist:PharmacistCreateModel = new PharmacistCreateModel;
  fetchData = false;
  constructor(private cityService: CityService,
    private countryService: CountryService, 
    private userService:UserService,
    private medicalStufService:MedicalStuffService,
    private router: Router) { }

  ngOnInit(): void {
    this.fetchData = true;
    this.userService.getMyInfo().subscribe((user) => this.user = user);
    this.cityService.findAllByCountry(this.selectedCountry).subscribe((response) => {
      this.cities = response;
    });
    this.countryService.findAll().subscribe((response) => {
      this.countries = response;
    });
    this.fetchData = false;
  }

  addWorkTime(){
    let time = new WorkTimeModel();
    if(this.model != undefined){
       let d = this.model.year + "-" + this.model.month + "-" + this.model.day;
      time.date = new Date(Date.parse(d));
    }
    else{
      alert("Choose day");
      return;
    }
    if(this.startTime.hour < 10 && this.startTime.minute < 10)
      time.startTime = "0"+this.startTime.hour + ":" +"0"+this.startTime.minute + ":00";
    if(this.startTime.hour > 9 && this.startTime.minute < 10)
      time.startTime =this.startTime.hour + ":" +"0"+this.startTime.minute + ":00";
    if(this.startTime.hour < 10 && this.startTime.minute > 9)
      time.startTime = "0"+this.startTime.hour + ":" + this.startTime.minute + ":00";
    if(this.startTime.hour > 9 && this.startTime.minute > 9)
      time.startTime =this.startTime.hour + ":" + this.startTime.minute + ":00";
    
    if(this.endTime.hour < 10 && this.endTime.minute < 10)
      time.endTime = "0"+this.endTime.hour + ":" + "0"+this.endTime.minute + ":00";
    if(this.endTime.hour > 9 && this.endTime.minute < 10)
      time.endTime = this.endTime.hour + ":" + "0"+this.endTime.minute + ":00";
    if(this.endTime.hour < 10 && this.endTime.minute > 9)
      time.endTime = "0"+this.endTime.hour + ":" + +this.endTime.minute + ":00";
    if(this.endTime.hour > 9 && this.endTime.minute > 9)
      time.endTime = this.endTime.hour + ":" + +this.endTime.minute + ":00";

    for(let a of this.pharmacist.workTimes){
      if(time.date.toString() == a.date.toString()){
        alert("Already set work day");
        return;
      }
    }
    this.pharmacist.workTimes.push(time);
    alert("Sucessfuly add work day");
  }


  save(){
    this.pharmacist.user = this.changeUser;
    this.pharmacist.emailPhAdmin = this.user.email;
    this.medicalStufService.savePharmacist(this.pharmacist).subscribe((user) => {alert("succesfuly add pharmacist");
    this.router.navigate(['/allPharmacist']);
  })
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

}

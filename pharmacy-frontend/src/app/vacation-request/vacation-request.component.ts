import { Component, OnInit } from '@angular/core';
import { MedicalStuffService } from '../services/medical-stuff.service';

@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.component.html',
  styleUrls: ['./vacation-request.component.css']
})
export class VacationRequestComponent implements OnInit {

  constructor(private medServ : MedicalStuffService) { }

  pharmacies = [];
  vacationStart : Date;
  startStr : any;
  endStr : any;
  vacationEnd : Date;
  selectedPharmacyName: string;
  selectedPharmacy: any;
  startValidity = 'no-validate';
  endValidity = 'no-validate';
  inputsValid = false;

  onChange(event){
    this.selectedPharmacy = null;
    this.selectedPharmacyName = event.target.value.toString();
    for (let pharmacy of this.pharmacies) {
      if ( this.selectedPharmacyName === pharmacy.name) {
        this.selectedPharmacy = pharmacy;
        break;
      }
    }
    this.validationCheck();
  }

  changeStartDate(event){
    this.vacationStart = new Date(event.target.valueAsNumber);
    this.startStr = event.target.value;
    this.validationCheck();
  }

  validationCheck(){
    let dateFlag = false;
    let startFlag = false;
    let endFlag = false;
    if(this.vacationStart){
      startFlag = true;
    }
    if(this.vacationEnd){
      endFlag = true;
    }
    if(startFlag && endFlag){
      dateFlag = (this.vacationStart < this.vacationEnd);
      let now = new Date(Date.now());
      dateFlag = dateFlag && (this.vacationStart > now);
      if(dateFlag){
        this.startValidity = 'no-validate';
        this.endValidity = 'no-validate';
      }
      else{
        this.startValidity = 'is-invalid';
        this.endValidity = 'is-invalid';
      }
    }
    if(this.selectedPharmacy){
      this.inputsValid = dateFlag;
      return;
    }
    this.inputsValid = false;
  }

  changeEndDate(event){
    this.vacationEnd = new Date(event.target.valueAsNumber);
    this.endStr = event.target.value;
    this.validationCheck();
  }

  sendRequest(){
    let req = {pharmacy : this.selectedPharmacy.id,
              dateRange: {startDate: this.vacationStart,
                          endDate: this.vacationEnd}};
    this.medServ.sendVacationRequest(req).subscribe( res=>{
      alert(res.result);
    }
    );
  }

  ngOnInit(): void {
    this.medServ.getMyPharmacies().subscribe(res =>{
      this.pharmacies = res;
    });
  }

}

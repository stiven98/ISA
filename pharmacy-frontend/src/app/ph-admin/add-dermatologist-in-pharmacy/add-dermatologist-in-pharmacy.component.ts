import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MedicalStuffService } from '../../services/medical-stuff.service';
import { PharmacistCreateModel } from '../create-pharmacist/PharmacistCreater';
import { WorkTimeModel } from '../create-pharmacist/WorkTime';

@Component({
  selector: 'app-add-dermatologist-in-pharmacy',
  templateUrl: './add-dermatologist-in-pharmacy.component.html',
  styleUrls: ['./add-dermatologist-in-pharmacy.component.css']
})
export class AddDermatologistInPharmacyComponent implements OnInit {
  model: NgbDateStruct;
  fetchData = false;
  dermatologist = []
  list = [];
  filter = [];
  role = false;
  pharmacyName:String;
  cityName:String;
  averageMark:number= 0;
  closeResult = '';
  startTime = {hour: 8, minute: 0};
  endTime = {hour: 16, minute: 0};
  pharmacist:PharmacistCreateModel = new PharmacistCreateModel();

  constructor(private medicalStuffService:MedicalStuffService, private modalService:NgbModal ) { }

  ngOnInit(): void {
    this.fetchData = true;
    this.medicalStuffService.getAllDermatologistFromOtherPharmacy().subscribe((list)=> {this.dermatologist = list;
      this.list = list;
    });
    this.fetchData = false;
  }



  change(derm){
    this.pharmacist.emailPhAdmin  = derm.email;
    this.role = !this.role;
  }

  save(derm){
    this.role = !this.role;
    this.medicalStuffService.addDermatologistInPharmacy(this.pharmacist).subscribe((res)=>
      {alert(res.result);
        this.dermatologist = this.dermatologist.filter(obj => obj !== derm);
    })


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



  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { addHours, addMinutes, startOfDay } from 'date-fns';
import { DrugService } from '../services/drug.service';
import { ExaminationService } from '../services/examination.service';

interface PatientInfo{
  name: string;
  lastName : string;
  phoneNumber : string;
  email : string;
};

interface ExaminationInfo{
  startTime: string;
  endTime : string;
  date : string;
};

@Component({
  selector: 'app-examination-data',
  templateUrl: './examination-data.component.html',
  styleUrls: ['./examination-data.component.css']
})
export class ExaminationDataComponent implements OnInit {

  constructor(private route : ActivatedRoute, private examinationService : ExaminationService, private drugService : DrugService, private modalService : NgbModal) { }
  drugList = [];
  inputsValid = false;
  prescribedDrugs = [];
  substituteDrugs = [];
  successfullyPrescribed = false;
  examinationId;
  examination;
  patientId;
  pharmacyId;
  employeeId;
  note = "";
  appointmentDate : Date;
  appointmentTime = [];
  dateValidity = 'no-validate'
  dateStr : any;
  timeStr : any;
  therapyDuration = 1;
  examinationInfo : ExaminationInfo = {startTime: '', endTime: '', date: ''};
  patientInfo : PatientInfo = {name: '', lastName: '', phoneNumber : '', email: ''};

  ngOnInit(): void {
    this.examinationId = this.route.snapshot.params[`examinationId`];
    this.examinationService.getCurrentExaminationById(this.examinationId).subscribe(res => {
      let examination = res;
      this.examination = examination;
      this.patientId = examination.patient.userId.toString();
      this.pharmacyId = examination.pharmacy.id.toString();
      this.employeeId = examination.employee.userId.toString();
      let name = examination.patient.accountInfo.name;
      let lastName = examination.patient.accountInfo.lastName;
      let phoneNumber = examination.patient.accountInfo.phoneNumber;
      let email = examination.patient.loginInfo.email;
      this.patientInfo = {name : name, lastName : lastName, phoneNumber : phoneNumber, email : email};
      let dateOfExamination = startOfDay(new Date(examination.dateOfExamination));
      let startHour = examination.timeOfExamination[0];
      let startMinutes = examination.timeOfExamination[1];
      let startTime = addMinutes(addHours(dateOfExamination, startHour), startMinutes);
      let endTime = addMinutes(startTime, examination.duration);
      this.examinationInfo = {startTime : startTime.toLocaleTimeString(), endTime : endTime.toLocaleTimeString(), date : dateOfExamination.toLocaleDateString()};
      
      let data = {patientId : this.patientId, pharmacyId: this.pharmacyId};

      this.drugService.findAllWithoutAllergies(data).subscribe(res => {
        console.log(res);
        this.drugList = res;
      });

    });
  }

  prescribeDrug(drugName, modalContent){
    this.modalService.dismissAll();
    this.substituteDrugs = [];
    for(let drug of this.drugList){
      if(drug.name === drugName){
        let data = {drugId: drug.drugId, pharmacyId: this.pharmacyId, patientId: this.patientId};
        this.examinationService.checkDrugAvailability(data).subscribe(res => {
          if(typeof (res.result) == 'number'){
            this.prescribedDrugs.push(drug);
            this.drugList = this.drugList.filter(obj => obj !== drug);
            alert("Successfully prescribed drug");
          }else{
            let subMeds = res.result;
            for(let sub of subMeds){
              this.substituteDrugs.push(sub);
            }
            this.open(modalContent);
          }
        });
        break;
      }
    }
  }

  removeDrug(drugName, modalContent){
    for(let drug of this.prescribedDrugs){
      if(drug.name === drugName){
        this.drugList.push(drug);
        this.prescribedDrugs = this.prescribedDrugs.filter(obj => obj !== drug);
        break;
      }
    }
  }

  open(content) {
    console.log(content);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  scheduleAppointment(){
    let data ={
    patientId: this.patientId,
    pharmacyId: this.pharmacyId,
    medStuffId: this.employeeId,
    date: this.appointmentDate,
    time: this.appointmentTime
    };
    this.examinationService.scheduleNewMed(data).subscribe(res =>{
      alert(res.result);
    },
    error =>{
      alert(error.result);
    });
  }

  changeDate(event){
    this.appointmentDate = new Date(event.target.valueAsNumber);
    this.dateStr = event.target.value;
    this.validationCheck();
  }

  validationCheck(){
      let now = new Date(Date.now());
      this.inputsValid = (this.appointmentDate > now);
      if(this.inputsValid){
        this.dateValidity = 'no-validate';
      }
      else{
        this.dateValidity = 'is-invalid';
      }
  }

  changeTime(event){
    let time : string = event.target.value;
    let tokens = time.split(":");
    this.appointmentTime = [Number(tokens[0]), Number(tokens[1])];
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

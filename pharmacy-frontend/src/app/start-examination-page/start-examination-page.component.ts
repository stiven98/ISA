import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addHours, addMinutes, startOfDay } from 'date-fns';
import { ExaminationService } from '../services/examination.service';
import { Location } from '@angular/common'

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
  selector: 'app-start-examination-page',
  templateUrl: './start-examination-page.component.html',
  styleUrls: ['./start-examination-page.component.css']
})

export class StartExaminationPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router : Router, private examinationService : ExaminationService, private location : Location) { }

  examinationId;

  disabledButtons = false;

  startAppointmentURL = "";

  patientId;

  penaltyGiven = false;

  examinationInfo : ExaminationInfo = {startTime: '', endTime: '', date: ''};

  patientInfo : PatientInfo = {name: '', lastName: '', phoneNumber : '', email: ''};

  examination : any;
  
  ngOnInit(): void {
    this.examinationId = this.route.snapshot.params[`examinationId`];
    this.examinationService.getCurrentExaminationById(this.examinationId).subscribe(res => {
      this.startAppointmentURL = "/examinationData/" + this.examinationId;
      let examination = res;
      this.examination = examination;
      this.patientId = examination.patient.userId.toString();
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
    }, error =>{
      this.disabledButtons = true;
      alert('The examination you are trying to start is not yet started or it has passed. You would be redirected back');
      setTimeout(() => {
        this.location.back();
      }, 3000);
    });
  }

  givePenalty(){
    if(!this.penaltyGiven && !this.disabledButtons){
      this.examinationService.givePenaltyToPatient(this.patientId).subscribe(res => {
        this.penaltyGiven = true;
        alert(res.result);
      });
    }else{
      alert("Penalty has been already given or you don't have rights to do that!");
    }
  }
    

  startAppointment(){

  }

}

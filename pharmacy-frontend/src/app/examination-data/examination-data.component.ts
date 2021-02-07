import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route : ActivatedRoute, private examinationService : ExaminationService, private drugService : DrugService) { }
  drugList = [];
  examinationId;
  examination;
  patientId;
  pharmacyId;
  note = "";
  examinationInfo : ExaminationInfo = {startTime: '', endTime: '', date: ''};
  patientInfo : PatientInfo = {name: '', lastName: '', phoneNumber : '', email: ''};

  ngOnInit(): void {
    this.examinationId = this.route.snapshot.params[`examinationId`];
    this.examinationService.getCurrentExaminationById(this.examinationId).subscribe(res => {
      let examination = res;
      this.examination = examination;
      this.patientId = examination.patient.userId.toString();
      this.pharmacyId = examination.pharmacy.id.toString();
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

}

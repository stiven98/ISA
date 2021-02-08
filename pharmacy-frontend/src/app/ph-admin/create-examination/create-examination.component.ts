import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { PharmacistCreateModel } from '../create-pharmacist/PharmacistCreater';
import { ExaminationCreateModel } from './examinationCreateDTO';
import {ActivatedRoute} from '@angular/router';
import { WorkTimeService } from '../../services/work-time.service';
import { ExaminationService } from '../../services/examination.service';



interface day{
  start:any[],
  end:any[],
};

@Component({
  selector: 'app-create-examination',
  templateUrl: './create-examination.component.html',
  styleUrls: ['./create-examination.component.css']
})
export class CreateExaminationComponent implements OnInit {
  model: NgbDateStruct;
  days = [];
  startTime = {hour: 8, minute: 0};
  endTime = {hour: 16, minute: 0};
  busyTime:day[];
  workStart = {hour:0, minute:0};
  workEnd = {hour:0, minute:0};
  examination:ExaminationCreateModel = new ExaminationCreateModel();
  constructor(private route: ActivatedRoute, private workTimeService:WorkTimeService, private examinationService:ExaminationService) {
    this.examination.email = route.snapshot.params['email'];
   }

  ngOnInit(): void {
    this.workTimeService.getWorkDay(this.route.snapshot.params['email']).subscribe((days)=>{
      for(let a of days){
        
        let s = new Date(a).toLocaleDateString();
        this.days.push(s);
      }
    })
  }





  onChangeSelectedDate(event){
    
    let a = event.target.value.split("/");
    let s = a[2] + "-" + a[0] + "-" + a[1];  
    let time = {
        date : new Date(Date.parse(s)),
        email : this.route.snapshot.params['email']
    }
    this.examination.date = time.date;
    this.examinationService.getBusyTime(time).subscribe((res) => {this.busyTime = res.busyDateDTOS;
      this.workStart.hour = res.start[0];
      this.workStart.minute = res.start[1];
      this.workEnd.hour = res.end[0];
      this.workEnd.minute = res.end[1];
    })

  }


  save(){

    if(this.startTime.hour < 10 && this.startTime.minute < 10)
      this.examination.startTime = "0"+this.startTime.hour + ":" +"0"+this.startTime.minute + ":00";
    if(this.startTime.hour > 9 && this.startTime.minute < 10)
      this.examination.startTime =this.startTime.hour + ":" +"0"+this.startTime.minute + ":00";
    if(this.startTime.hour < 10 && this.startTime.minute > 9)
      this.examination.startTime = "0"+this.startTime.hour + ":" + this.startTime.minute + ":00";
    if(this.startTime.hour > 9 && this.startTime.minute > 9)
      this.examination.startTime =this.startTime.hour + ":" + this.startTime.minute + ":00";

    let hour =  this.endTime.hour - this.startTime.hour;
    let minute = this.startTime.minute - this.endTime.minute;

    if(hour < 0){
      alert("End hour can't be less than start hour");
      return;
    }

    if(hour !=  0)
      hour = hour * 60;
    if(minute < 0)
      minute = - minute;

    this.examination.duration = hour + minute;

    this.examinationService.saveExamination(this.examination).subscribe((res) =>
    {alert(res.result);}
    );

  }



}

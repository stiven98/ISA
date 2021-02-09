import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExaminationService} from '../services/examination.service';
import {Patient} from '../shared/models/patient';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-dermatologist-examination',
  templateUrl: './dermatologist-examination.component.html',
  styleUrls: ['./dermatologist-examination.component.css']
})
export class DermatologistExaminationComponent implements OnInit {

  name: string;
  dermatologistsExam = [];
  patient = new Patient();
  constructor(private route: ActivatedRoute, private examinationService: ExaminationService,
              private userService: UserService, private router: Router) {
    this.name = route.snapshot.params[`name`];
  }

  ngOnInit(): void {
    this.userService.getMyInfo().subscribe( resUser => {
      this.patient = resUser;
      this.examinationService.getAvailableDermatologists(this.name).subscribe((dermatologists) => {
        this.dermatologistsExam = dermatologists;
      });
    });
  }
  scheduleExamination = (examinationId) => {
    this.examinationService.scheduleNewExamination(examinationId,this.patient.email).subscribe();
    alert('If you dont have any scheduled examinations for choosen date your examination is scheduled');
    this.router.navigate(['/patient']);
  }
  sortByPrice = () => {
    for (let i = 0; i < this.dermatologistsExam.length - 1; i++ ) {
      for ( let j = 0; j < this.dermatologistsExam.length - i - 1; j++ ) {
        if ( this.dermatologistsExam[j].examinationPrice.price > this.dermatologistsExam[j + 1].examinationPrice.price){
          const temp = this.dermatologistsExam[j];
          this.dermatologistsExam[j] = this.dermatologistsExam[j + 1];
          this.dermatologistsExam[j + 1] = temp;
        }
      }
    }
  }
  sortByAverageMark = () => {
    for (let i = 0; i < this.dermatologistsExam.length - 1; i++ ) {
      for ( let j = 0; j < this.dermatologistsExam.length - i - 1; j++ ) {
        if ( this.dermatologistsExam[j].employee.averageMark < this.dermatologistsExam[j + 1].employee.averageMark){
          const temp = this.dermatologistsExam[j];
          this.dermatologistsExam[j] = this.dermatologistsExam[j + 1];
          this.dermatologistsExam[j + 1] = temp;
        }
      }
    }
  }
}

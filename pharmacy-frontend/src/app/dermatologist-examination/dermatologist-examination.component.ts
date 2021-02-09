import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExaminationService} from '../services/examination.service';

@Component({
  selector: 'app-dermatologist-examination',
  templateUrl: './dermatologist-examination.component.html',
  styleUrls: ['./dermatologist-examination.component.css']
})
export class DermatologistExaminationComponent implements OnInit {

  name: string;
  dermatologistsExam = [];
  constructor(private route: ActivatedRoute, private examinationService: ExaminationService) {
    this.name = route.snapshot.params[`name`];
  }

  ngOnInit(): void {
    this.examinationService.getAvailableDermatologists(this.name).subscribe((dermatologists) => {
      this.dermatologistsExam = dermatologists;
    });
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

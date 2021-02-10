import { DecimalPipe } from '@angular/common';
import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { addHours, addMinutes } from 'date-fns';
import { ExaminationService } from '../services/examination.service';
import { MedicalStuffService } from '../services/medical-stuff.service';
import { PatientClient } from '../shared/models/patientClient';
import { NgbdSortableHeaderDirective, SortColumn, SortEvent } from '../shared/utilities/ngbd-sortable-header.directive';

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(clients: PatientClient[], starter: PatientClient[], column: SortColumn, direction: string): PatientClient[] {
  if (direction === '' || column === '') {
    return starter;
  } else {
    return [...clients].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

interface ExaminationInfoSelect{
  id : string;
  dateAndTime : string;
};

@Component({
  selector: 'app-medical-stuff-clients',
  templateUrl: './medical-stuff-clients.component.html',
  styleUrls: ['./medical-stuff-clients.component.css'],
  providers: [MedicalStuffService, DecimalPipe]
})
export class MedicalStuffClientsComponent implements OnInit {

  selectedExaminationId = '';

  examinations = [];
  mapExaminations : Map<string, string> = new Map();
  canStart = false;
  constructor(private router : Router, private medicalStuffServ : MedicalStuffService, private modalService : NgbModal, private examinationService : ExaminationService) {
  }
  patients: PatientClient[];
  starter: PatientClient[];
  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;

  searchInput = '';

  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.patients = sort(this.patients, this.starter, column, direction);

  }

  selectRow(pat, content){
    this.examinationService.getAllByEmployeeAndPatient(pat.id).subscribe(res => {
      let examinationList = res;
      let tmpList : ExaminationInfoSelect[] = [];
      for(let examination of examinationList){
        let time = examination.time;
        let hour = time[0];
        let minutes = time[1];
        let examinationDate =  new Date(examination.date);
        let termTime = addMinutes(addHours(examinationDate, hour), minutes);
        let dateTime = examinationDate.toLocaleDateString() + ' ' + termTime.toLocaleTimeString();
        let examTmp : ExaminationInfoSelect = {
          id : examination.examinationId,
          dateAndTime : dateTime,
        };
        tmpList.push(examTmp);
        this.mapExaminations[dateTime] = examination.examinationId;
      }
      this.examinations = tmpList;
      this.open(content);
    });
  }

  onChange(event){
    this.selectedExaminationId =  this.mapExaminations[event.target.value];
  }

  startExamination(modal){
    if(this.selectedExaminationId == ''){
      alert("You must choose appointment term")
    }
    else{
      this.router.navigate(['/examination/'+this.selectedExaminationId]);
      this.modalService.dismissAll();
    }
  }

  search(){
    this.patients = this.starter;
    let inp = this.searchInput.toLowerCase().trim();
    let searchTerms = inp.split(/\s+/);
    if(inp === ''){
      return;
    }
    else{
      this.patients = this.patients.filter(pat =>{
        let flag = false;
        for(let term of searchTerms){
          if(pat.name.toLowerCase().includes(term) || pat.lastName.toLowerCase().includes(term)){
            flag = true;
          }
          else{
            flag = false;
          }
        }
        return flag;
      });
    }
  }


  ngOnInit(): void {
    this.medicalStuffServ.getMyPatients().subscribe(res => {
      let tmp = res;
      for(let pat of tmp){
        pat.examinationDate = new Date(pat.examinationDate).toLocaleDateString();
      }
      this.patients = tmp;
      this.starter = tmp;
    });
  }

  open(content) {
    console.log(content);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
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

import { DecimalPipe } from '@angular/common';
import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
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

@Component({
  selector: 'app-medical-stuff-clients',
  templateUrl: './medical-stuff-clients.component.html',
  styleUrls: ['./medical-stuff-clients.component.css'],
  providers: [MedicalStuffService, DecimalPipe]
})
export class MedicalStuffClientsComponent implements OnInit {

  constructor(private medicalStuffServ : MedicalStuffService) {
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

}

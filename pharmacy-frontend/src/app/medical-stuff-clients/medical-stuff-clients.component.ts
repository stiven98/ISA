import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicalStuffService } from '../services/medical-stuff.service';

// Block of code bellow is downloaded from https://stackblitz.com/run?file=src%2Fapp%2Ftable-sortable.ts

@Component({
  selector: 'app-medical-stuff-clients',
  templateUrl: './medical-stuff-clients.component.html',
  styleUrls: ['./medical-stuff-clients.component.css']
})
export class MedicalStuffClientsComponent implements OnInit {

  patients: any[];

  constructor(private medicalStuffServ : MedicalStuffService) { 
  }

  
  ngOnInit(): void {
    this.medicalStuffServ.getMyPatients().subscribe(res =>{
      let tmp = res;
      let tmp2 = [];
      for(let i = 0; i < tmp.length; i++){
        tmp2.push({
          "id": i + 1,
          "name": tmp[i].name,
          "lastName": tmp[i].lastName,
          "examinationDate": new Date(tmp[i].examinationDate).toLocaleDateString(),
          "email": tmp[i].email,
          "phoneNumber": tmp[i].phoneNumber
        })
      }
      this.patients = tmp2;
    })
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.component.html',
  styleUrls: ['./vacation-request.component.css']
})
export class VacationRequestComponent implements OnInit {

  constructor() { }

  pharmacies = [];
  vacationStart : Date;
  vacationEnd : Date;
  selectedPharmacyName: string;
  onChange(event){}

  sendRequest(){
    
  }

  ngOnInit(): void {
  }

}

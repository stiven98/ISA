import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrugreservationService } from '../services/drugreservation.service';

@Component({
  selector: 'app-medicament-issuing',
  templateUrl: './medicament-issuing.component.html',
  styleUrls: ['./medicament-issuing.component.css']
})
export class MedicamentIssuingComponent implements OnInit {

  reservationCode = '';
  drugReservationId;
  inputsValid = true;
  isCodeValid = true;
  reservations = [];
  reservationInfo = {customerName: '',
                     drugName : '',
                     deadline : ''}
  constructor(private drugResServ : DrugreservationService, private router: Router) { }

  findReservation(){
    this.reservations = [];
    this.drugResServ.findReservationByCode(this.reservationCode).subscribe(res => {
      let reservation = res;
      if(reservation){
        this.reservations.push(res);
        this.drugReservationId = reservation.drug_reservation_id;
        let name = reservation.patient.accountInfo.name + ' ' + reservation.patient.accountInfo.lastName;
        let drugName = reservation.drug.name;
        let deadline = new Date(reservation.reservationDateRange.endDate).toLocaleDateString();
        this.reservationInfo = {customerName : name,
                                drugName : drugName,
                                deadline : deadline};
      }
      this.isCodeValid = (this.reservations.length > 0);
    },
    error => {
      this.isCodeValid = false;
    });
  }

  issueDrug(){
    if(this.drugReservationId){
      this.drugResServ.issueDrug(this.drugReservationId).subscribe( res => {
        alert('Medicament successfully issued.');
      },
      error => {
        alert('Error occurred during medicament issuing.');
      });
    }
  }

  checkInputs(){
    this.inputsValid = (this.reservationCode.trim() !== '');
  }

  ngOnInit(): void {
  }

}

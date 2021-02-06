import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {PatientService} from '../services/patient.service';
import {Router} from '@angular/router';
import {Patient} from '../shared/models/patient';
import {Drug} from '../shared/models/drug';
import {AccountCategory} from '../shared/models/accountCategory';
import {DrugService} from '../services/drug.service';
import {PharmacymarkService} from '../services/pharmacymark.service';
import {Mark} from '../shared/models/mark';
import {Markdto} from '../shared/models/markdto';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patient = new Patient();
  allergies: Drug [];
  drugs: Drug [];
  reservations = [];
  nmr = 0;
  filter;
  currentMark = new Mark();
  erecepies = [];
  erecepiesFilter = [];
  drugList = [];
  pharmacyMarks = [];
  addAllergies: string;
  accountCategory = new AccountCategory();
  penalties: number;
  constructor(private userService: UserService, private patientService: PatientService,
              private drugService: DrugService, private router: Router,
              private markService: PharmacymarkService) { }

  ngOnInit(): void {
    this.userService.getMyInfo().subscribe( resUser => {
      this.patient = resUser;
      this.patientService.findReservations(this.patient.email).subscribe((reservation) => {
        this.reservations = reservation;
      });
      this.patientService.findERecepies(this.patient.email).subscribe((erecepie) => {
        this.erecepies = erecepie;
        this.erecepiesFilter = erecepie;
      });
      this.patientService.findAccountCategory(this.patient.email).subscribe( accountCat => {
        this.accountCategory = accountCat;
      });
      this.patientService.findPenalties(this.patient.email).subscribe( penalty => {
        this.penalties = penalty;
      });
      this.patientService.findMarksByPatient(this.patient.email).subscribe((marks) => {
        this.pharmacyMarks = marks;
      });
      this.patientService.findAllergies(this.patient.email).subscribe((aller) => {
       this.allergies = aller;
       this.drugService.findAll().subscribe((drug) => {
             this.drugs = drug;

             for (let i = 0; i < this.drugs.length; i++) {
               let flag = true;
               for (let j = 0; j < this.allergies.length; j++) {
                 if ( this.drugs[i].name === this.allergies[j].name ) {
                   flag = false;
                   break;
                 }
               }
               if (flag) {
                 this.drugList.push(this.drugs[i]);
               }
             }
        });
      });
    });

  }
  filterERecepies = () => {
    const filtered = [];
    for (let i = 0; i < this.erecepiesFilter.length; i++ ) {
      if ( this.erecepiesFilter[i].erecipeStatus === this.filter ) {
          filtered.push(this.erecepiesFilter[i]);
      }
    }
    this.erecepies = filtered;
    if (this.filter === "Choose filter") {
      this.erecepies = this.erecepiesFilter;
    }

  }
  goToAddMarks = () => {
    this.router.navigate(['/patient-marks']);
  }
  addAllergy(): void {
    console.log(this.addAllergies);
    console.log(this.patient.email);
    this.patientService.addAllergy(this.patient.email, this.addAllergies).subscribe(res => {
      alert('Succsessfuly added allergy' + this.addAllergies);
    });
    window.location.reload();

  }
  sortERecepies = () => {
    for (let i = 0; i < this.erecepies.length - 1; i++ ) {
      for ( let j = 0; j < this.erecepies.length - i - 1; j++ ) {
        if ( this.erecepies[j].dateOfIssuing > this.erecepies[j + 1].dateOfIssuing){
          const temp = this.erecepies[j];
          this.erecepies[j] = this.erecepies[j + 1];
          this.erecepies[j + 1] = temp;
        }
      }
    }
  }
  onSelect = (event) => {
    this.addAllergies = event.target.value.toString();

  }
  alert = () => {
    alert('Go to pharmacy home page where you want to make new appointment');
    this.router.navigate(['/pharmacy']);
  }
  cancelReservation = (reservation) => {
    const deadline = new Date(reservation.reservationDateRange.endDate).toLocaleDateString();
    const parts = deadline.split('/');
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const day: number = +dd;
    const month: number = +mm;
    const deadlineday: number = +parts[1];
    const deadlinemonth: number = +parts[0];
    if (deadlinemonth > month || (deadlinemonth === month && deadlineday > day + 1)) {
    this.patientService.cancelReservation(reservation.drug_reservation_id).subscribe();
    window.location.reload();
   }
    else {
     alert('You cant cancel reservation 24h before deadline');
    }
  }

  changeMark = () => {
    const markdto = new Markdto();
    markdto.pharmacyMarksId = this.currentMark.pharmacyMarksId;
    markdto.newMark = this.nmr;
    if (this.nmr !== 0) {
      this.markService.changeMark(markdto).subscribe();
    }else {
      alert('You must enter a number 1-10');
    }
  }
  current = (mark) => {
    this.currentMark = mark;
  }
}



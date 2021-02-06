import { Component, OnInit } from '@angular/core';
import {PatientService} from '../services/patient.service';
import {UserService} from '../services/user.service';
import {Patient} from '../shared/models/patient';
import {PharmacyService} from '../services/pharmacy.service';
import {PharmacymarkService} from '../services/pharmacymark.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-marks',
  templateUrl: './patient-marks.component.html',
  styleUrls: ['./patient-marks.component.css']
})
export class PatientMarksComponent implements OnInit {

  pharmacies = [];
  patient = new Patient();
  drugs = [];
  pharmacy = '';
  marksPharmacies = [];
  finalPharmaciesToMark = [];
  drug = '';
  pharmacyMark = 0;
  drugMark = 0;

  constructor(private patientService: PatientService, private userService: UserService,
              private pharmacyMarkService: PharmacymarkService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getMyInfo().subscribe(resUser => {
      this.patient = resUser;
      this.patientService.findPharmaciesToMark(this.patient.email).subscribe((response) => {
        this.pharmacies = response;
        this.patientService.findDrugsToMark(this.patient.email).subscribe((drugs) => {
          this.drugs = drugs;
          this.pharmacyMarkService.findMarksByPatient(this.patient.email).subscribe((pharmaices) => {
              this.marksPharmacies = pharmaices;
            for (let i = 0; i < this.pharmacies.length; i++) {
              let flag = true;
              for (let j = 0; j < this.marksPharmacies.length; j++) {
                if ( this.pharmacies[i].name === this.marksPharmacies[j].name ) {
                  flag = false;
                  break;
                }
              }
              if (flag) {
                this.finalPharmaciesToMark.push(this.pharmacies[i]);
              }
            }
          });
        });
      });
    });
  }
  markDrugOrPharmacy = () => {
    if (this.drug !== '' && this.drug !== 'Choose drug you used' && this.drugMark !== 0) {
      alert('usao lek');
    }
    if (this.pharmacy !== '' && this.pharmacy !== 'Choose pharmacy you interacted with' && this.pharmacyMark !== 0) {
      alert('usao');
      this.pharmacyMarkService.addPharmacyMark(this.pharmacy, this.patient.email, this.pharmacyMark).subscribe();
      this.router.navigate(['/patient']);
    }
  }
}

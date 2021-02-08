import { Component, OnInit } from '@angular/core';
import {PatientService} from '../services/patient.service';
import {UserService} from '../services/user.service';
import {Patient} from '../shared/models/patient';
import {PharmacymarkService} from '../services/pharmacymark.service';
import {Router} from '@angular/router';
import {DrugMarksService} from '../services/drug-marks.service';
import {MedicalstuffMarkService} from '../services/medicalstuff-mark.service';

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
  medicalStuffToMark = [];
  marksMedicalStuff = [];
  finalMedicalStuffToMark = [];
  marksDrugs = [];
  finalPharmaciesToMark = [];
  finalDrugsToMark = [];
  drug = '';
  pharmacyMark = 0;
  drugMark = 0;
  medicalStuffMark = 0;
  selectedMs;

  constructor(private patientService: PatientService, private userService: UserService,
              private pharmacyMarkService: PharmacymarkService, private router: Router,
              private drugMarkService: DrugMarksService, private medicalStuffMarkService: MedicalstuffMarkService) {
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
            this.drugMarkService.findMarksByPatient(this.patient.email).subscribe((drug) => {
              this.marksDrugs = drug;
              this.patientService.findMedicalStuffToMark(this.patient.email).subscribe((med) => {
                this.medicalStuffToMark = med;
                this.medicalStuffMarkService.findMarksByPatient(this.patient.email).subscribe((ms) => {
                this.marksMedicalStuff = ms;
                  for (let i = 0; i < this.medicalStuffToMark.length; i++) {
                    let flag = true;
                    for (let j = 0; j < this.marksMedicalStuff.length; j++) {
                      if (this.medicalStuffToMark[i].accountInfo.name === this.marksMedicalStuff[j].accountInfo.name) {
                        flag = false;
                        break;
                      }
                    }
                    if (flag) {
                      this.finalMedicalStuffToMark.push(this.medicalStuffToMark[i]);
                    }
                  }
                for (let i = 0; i < this.pharmacies.length; i++) {
                  let flag = true;
                  for (let j = 0; j < this.marksPharmacies.length; j++) {
                    if (this.pharmacies[i].name === this.marksPharmacies[j].name) {
                      flag = false;
                      break;
                    }
                  }
                  if (flag) {
                    this.finalPharmaciesToMark.push(this.pharmacies[i]);
                  }
                }
                for (let i = 0; i < this.drugs.length; i++) {
                  let flag = true;
                  for (let j = 0; j < this.marksDrugs.length; j++) {
                    if (this.drugs[i].name === this.marksDrugs[j].name) {
                      flag = false;
                      break;
                    }
                  }
                  if (flag) {
                    this.finalDrugsToMark.push(this.drugs[i]);
                  }
                }
                });
              });
            });
          });
        });
      });
    });
  }

  markDrugOrPharmacy = () => {
    if (this.drug !== '' && this.drug !== 'Choose drug you used' && this.drugMark !== 0) {
      this.drugMarkService.addDrugMark(this.drug, this.patient.email, this.drugMark).subscribe();
      this.router.navigate(['/patient']);
    }
    if (this.pharmacy !== '' && this.pharmacy !== 'Choose pharmacy you interacted with' && this.pharmacyMark !== 0) {
      this.pharmacyMarkService.addPharmacyMark(this.pharmacy, this.patient.email, this.pharmacyMark).subscribe();
      this.router.navigate(['/patient']);
    }
  }
  markMedicalStuff = () => {
    if ( this.selectedMs !== '' && this.medicalStuffMark !== 0 && this.selectedMs !== 'Choose medical stuff you interacted with') {
      const parts = this.selectedMs.split(' ');
      const email = parts[3];
      this.medicalStuffMarkService.addMedicalStuffMark(email, this.patient.email, this.medicalStuffMark).subscribe();
      this.router.navigate(['/patient']);
    }
  }
}

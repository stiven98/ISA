import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Drug} from '../shared/models/drug';
import {DrugService} from '../services/drug.service';
import {PharmacyService} from '../services/pharmacy.service';
import {Pharmacy} from '../shared/models/Pharmacy';
import {UserService} from '../services/user.service';
import {Patient} from '../shared/models/patient';
import {DrugReservation} from '../shared/models/drugreservation';
import {DrugreservationService} from '../services/drugreservation.service';
import {PatientService} from '../services/patient.service';

@Component({
  selector: 'app-drug-reservation',
  templateUrl: './drug-reservation.component.html',
  styleUrls: ['./drug-reservation.component.css']
})
export class DrugReservationComponent implements OnInit {
  drugName: string;
  drug = new Drug();
  pharmacies = [];
  price = 0;
  pharmacyName: string;
  quantity: number;
  totalToPay = 0;
  pharmacy = new Pharmacy();
  deadline;
  today = new Date();
  patient = new Patient();
  available: number;
  penalties: number;
  constructor(private route: ActivatedRoute, private drugService: DrugService, private pharmacyService: PharmacyService,
              private userService: UserService, private drugreservationService: DrugreservationService, private router: Router,
              private patientService: PatientService) { }

  ngOnInit(): void {
    this.drugName = this.route.snapshot.params[`drug`];
    this.userService.getMyInfo().subscribe( resUser => {
      this.patient = resUser;
    });
    this.patientService.findPenalties(this.patient.email).subscribe( penalty => {
      this.penalties = penalty;
    });
    this.drugService.findDrugByName(this.drugName).subscribe((drug) =>  {
      this.drug = drug;
      this.pharmacyService.findPharmaciesWithDrug(this.drug.drugId).subscribe((response ) => {
        this.pharmacies = response;
      });
    });
  }
  onSelect = (event) => {
    console.log(event);
    this.pharmacyName = event.target.value.toString();
    for (let i = 0; i < this.pharmacies.length; i++) {
      if ( this.pharmacyName === this.pharmacies[i].name) {
        this.drugService.findDrugPrice(this.pharmacies[i].id, this.drug.drugId).subscribe((price) => {
          this.price = price;
          this.totalToPay = this.price * this.quantity;
          this.drugService.findDrugQuantity(this.drug.drugId, this.pharmacies[i].id).subscribe((available) => {
            this.available = available;
            this.pharmacy = this.pharmacies[i];
          });
        });
        break;
      }
    }
  }
  onInput = (event) => {
    this.totalToPay = this.price * this.quantity;
  }
  reserveDrug = () => {
    if (this.penalties < 3) {
      alert('Reservation successfully  created');
      const drugReservation = new DrugReservation();
      drugReservation.patientEmail = this.patient.email;
      drugReservation.deadline = this.deadline;
      drugReservation.pharmacyId = this.pharmacy.id;
      drugReservation.quantity = this.quantity;
      drugReservation.drugId = this.drug.drugId;
      drugReservation.price = this.totalToPay;
      this.drugreservationService.createReservation(drugReservation).subscribe();
      this.router.navigate(['/pharmacy']);
    }
    else {
      alert('You have 3 or more penalties and you cant reserve drug!');
      this.router.navigate(['/pharmacy']);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Drug} from '../shared/models/drug';
import {DrugService} from '../services/drug.service';
import {PharmacyService} from '../services/pharmacy.service';

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
  deadline;
  constructor(private route: ActivatedRoute, private drugService: DrugService, private pharmacyService: PharmacyService) { }

  ngOnInit(): void {
    this.drugName = this.route.snapshot.params[`drug`];
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
        this.drugService.findDrugPrice(this.pharmacies[i].id, this.drug.drugId).subscribe((price) =>{
          this.price = price;
          this.totalToPay = this.price * this.quantity;
        });
        break;
      }
    }
  }
  onInput = (event) => {
    this.totalToPay = this.price * this.quantity;
  }
}

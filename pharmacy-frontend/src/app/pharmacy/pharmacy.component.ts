import { Component, OnInit } from '@angular/core';
import {PharmacyService} from '../services/pharmacy.service';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {
  pharmacies = [];
  filteredPharmacies = [];
  pharmacyName: string;
  constructor(private pharmacyService: PharmacyService ) { }

  ngOnInit(): void {
    this.pharmacyService.findAll().subscribe((response ) => {
      this.pharmacies = response;
    });
  }

}

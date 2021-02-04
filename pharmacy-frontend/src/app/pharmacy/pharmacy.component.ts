import { Component, OnInit } from '@angular/core';
import {PharmacyService} from '../services/pharmacy.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {
  pharmacies =  [];
  searchActive = false;
  pharmacyName: string = "";
  pharmacyCity: string = "";
  pharmacyGrade: 0;
  constructor(private pharmacyService: PharmacyService) { }

  ngOnInit(): void {
    this.searchActive = false;
    this.pharmacyService.findAll().subscribe((response ) => {
      this.pharmacies = response;
    });
  }
 reload = () => {
    window.location.reload();
 }
 searchPharmacies = () => {
    this.searchActive = true;
    this.pharmacyService.searchPharmacies(this.pharmacyName, this.pharmacyCity, this.pharmacyGrade).subscribe((searchRes) => {
      this.pharmacies = searchRes;
    });
 }
 sortByAverageMark = () => {
    for (let i = 0; i < this.pharmacies.length - 1; i++ ) {
      for ( let j = 0; j < this.pharmacies.length - i - 1; j++ ) {
        if ( this.pharmacies[j].averageMark < this.pharmacies[j + 1].averageMark){
         const temp = this.pharmacies[j];
         this.pharmacies[j] = this.pharmacies[j + 1];
         this.pharmacies[j + 1] = temp;
        }
      }
    }
 }
  sortByName = () => {
    for (let i = 0; i < this.pharmacies.length - 1; i++ ) {
      for ( let j = 0; j < this.pharmacies.length - i - 1; j++ ) {
        if ( this.pharmacies[j].name < this.pharmacies[j + 1].name){
          const temp = this.pharmacies[j];
          this.pharmacies[j] = this.pharmacies[j + 1];
          this.pharmacies[j + 1] = temp;
        }
      }
    }
  }
  sortByCity = () => {
    for (let i = 0; i < this.pharmacies.length - 1; i++ ) {
      for ( let j = 0; j < this.pharmacies.length - i - 1; j++ ) {
        if ( this.pharmacies[j].location.city.name > this.pharmacies[j + 1].location.city.name){
          const temp = this.pharmacies[j];
          this.pharmacies[j] = this.pharmacies[j + 1];
          this.pharmacies[j + 1] = temp;
        }
      }
    }
  }

}

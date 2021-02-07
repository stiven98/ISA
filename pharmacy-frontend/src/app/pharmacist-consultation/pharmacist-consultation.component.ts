import { Component, OnInit } from '@angular/core';
import {PharmacyService} from '../services/pharmacy.service';

@Component({
  selector: 'app-pharmacist-consultation',
  templateUrl: './pharmacist-consultation.component.html',
  styleUrls: ['./pharmacist-consultation.component.css']
})
export class PharmacistConsultationComponent implements OnInit {
  date = null;
  time = null;
  pharmacies = [];
  constructor(private pharmacyService: PharmacyService) { }

  ngOnInit(): void {
  }

  showPharmacies = () => {
    const dat = new Date();
    alert(dat);
    if ( this.date !== null && this.time != null) {
        this.pharmacyService.findAll().subscribe((response) => {
          this.pharmacies = response;
        });
    }
    else {
      alert('You must choose time and date for consultations');
    }
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

}
import { Component, OnInit } from '@angular/core';
import {PharmacyService} from '../services/pharmacy.service';
import {FreeTermDTO} from '../shared/models/FreeTermDTO';


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
    if ( this.date !== null && this.time != null) {
        const dto = new FreeTermDTO();
        dto.date = this.date;
        dto.time = this.time;
        this.pharmacyService.findAllWithFreeTerm(dto).subscribe((response) => {
          this.pharmacies = response;
          if (this.pharmacies.length === 0) {
            alert('There are no free terms for the selected date and time.' +
              ' Please choose other date and time.');
          }
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

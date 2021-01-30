import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PharmacyService} from '../../services/pharmacy.service';


@Component({
  selector: 'app-pharmacy-home',
  templateUrl: './pharmacy-home.component.html',
  styleUrls: ['./pharmacy-home.component.css']
})
export class PharmacyHomeComponent implements OnInit {
  name: string;
  pharmacy;
  pharmacists = [];
  dermatologists = [];
  drugs = [];

  constructor(private route: ActivatedRoute, private pharmacyService: PharmacyService) {
    this.name = route.snapshot.params[`name`];
  }

  ngOnInit(): void {
    this.pharmacyService.findByName(this.name).subscribe((response) => {
      this.pharmacy = response;
      for ( let i = 0; i < this.pharmacy.pharmacists.length; i++) {
        this.pharmacyService.findMedicalStuffById(this.pharmacy.pharmacists[i]).subscribe((pharmacist) => {
          this.pharmacists.push(pharmacist);

        });
      }
      for ( let i = 0; i < this.pharmacy.dermatologists.length; i++) {
        this.pharmacyService.findMedicalStuffById(this.pharmacy.dermatologists[i]).subscribe((dermatologist) => {
          this.dermatologists.push(dermatologist);

        });
      }
      this.pharmacyService.findDrugById(this.pharmacy.id).subscribe((drug) => {
          this.drugs = drug;
        });

    });

  }
}

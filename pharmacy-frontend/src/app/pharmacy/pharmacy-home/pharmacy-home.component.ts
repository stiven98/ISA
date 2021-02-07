import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PharmacyService} from '../../services/pharmacy.service';
import {Pharmacy} from '../../shared/models/Pharmacy';
import {AuthService} from '../../services/auth.service';
import {PatientService} from '../../services/patient.service';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-pharmacy-home',
  templateUrl: './pharmacy-home.component.html',
  styleUrls: ['./pharmacy-home.component.css']
})
export class PharmacyHomeComponent implements OnInit {
  name: string;
  pharmacists = [];
  dermatologists = [];
  drugs = [];
  pharmacy: Pharmacy = new Pharmacy();
  email: string;
  isSubscribed: boolean;
  fetchData = true;

  constructor(private route: ActivatedRoute,
              private pharmacyService: PharmacyService,
              public authService: AuthService,
              private patientService: PatientService,
              private userService: UserService) {
    this.name = route.snapshot.params[`name`];
  }

  ngOnInit(): void {

    this.pharmacyService.findByName(this.name).subscribe(response => {
      this.pharmacy = response;

      this.userService.getMyInfo().subscribe((user) => {
        this.email = user.email;
        this.patientService.isSubscribedPharmacy(user.email, this.pharmacy.id).subscribe((response) => {
          this.isSubscribed = (response === true);
        });
      });

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

      this.fetchData = false;
    });

  }


  subscribeOnPharmacy = () => {
    this.patientService.subscribePharmacy(this.email, this.pharmacy.id).subscribe((response) => {
      this.isSubscribed = true;
    });
  }

  unSubscribeOnPharmacy = () => {
    this.patientService.unsubscribePharmacy(this.email, this.pharmacy.id).subscribe((response) => {
      this.isSubscribed = false;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {PatientService} from '../services/patient.service';

@Component({
  selector: 'app-subscribed-pharmacy',
  templateUrl: './subscribed-pharmacy.component.html',
  styleUrls: ['./subscribed-pharmacy.component.css']
})
export class SubscribedPharmacyComponent implements OnInit {

  pharmacies: any [];
  email: string;
  constructor(private userService: UserService,
              private router: Router,
              private patientService: PatientService) { }

  ngOnInit(): void {
    this.pharmacies = [];
    this.userService.getMyInfo().subscribe((user) => {
      this.email = user.email;
      this.patientService.findAllSubscribedPharmacy(user.email).subscribe(response => {
        this.pharmacies = response;
      });



    }, error => {
      this.router.navigate(['login']);
    });
  }

  unfollowPharmacy = (id: string) => {
    this.patientService.unsubscribePharmacy(this.email, id).subscribe((response) => {
      this.ngOnInit();
    });
  }

}

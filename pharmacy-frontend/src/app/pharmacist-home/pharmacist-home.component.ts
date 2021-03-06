import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { Dermatologist } from '../shared/models/dermatologist';

@Component({
  selector: 'app-pharmacist-home',
  templateUrl: './pharmacist-home.component.html',
  styleUrls: ['./pharmacist-home.component.css']
})
export class PharmacistHomeComponent implements OnInit {

  pharmacist = new Dermatologist();
  constructor(
    private userService: UserService,
    private router: Router,
    private modalService : NgbModal
  ) { }

   account(el: HTMLElement){
    this.router.navigate(['pharmacist/changeAccountInfo']);
    setTimeout(() => {
    el.scrollIntoView({ behavior: 'smooth' });
  }, 1000);
  }

  patients(el: HTMLElement){
    this.router.navigate(['pharmacist/patients']);
    el.scrollIntoView({ behavior: 'smooth' });
  }

  calendar(el: HTMLElement){
    this.router.navigate(['pharmacist/workCalendar']);
    el.scrollIntoView({ behavior: 'smooth' });
  }

  vacation(el: HTMLElement){
    this.router.navigate(['pharmacist/vacationRequest']);
    el.scrollIntoView({ behavior: 'smooth' });
  }

  medicamentIssuing(el: HTMLElement){
    this.router.navigate(['pharmacist/medicamentIssuing']);
    el.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnInit(): void {

    this.userService.getMyInfo().subscribe(resUser => {
    this.pharmacist =  resUser;

    });
  }

  openModal(modalDial){
    this.modalService.open(modalDial, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed`);
    }, (reason) => {
      console.log(`Dismissed`);
    });
  }

}

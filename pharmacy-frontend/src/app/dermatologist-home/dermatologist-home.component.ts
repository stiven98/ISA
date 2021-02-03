import { DOCUMENT } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Dermatologist } from '../shared/models/dermatologist';

@Component({
  selector: 'app-dermatologist-home',
  templateUrl: './dermatologist-home.component.html',
  styleUrls: ['./dermatologist-home.component.css']
})
export class DermatologistHomeComponent implements OnInit {

  dermatologist = new Dermatologist();
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

   account(el: HTMLElement){
    this.router.navigate(['dermatologist/changeAccountInfo']);
    setTimeout(() => {
    el.scrollIntoView({ behavior: 'smooth' });
  }, 1000);
  }

  patients(el: HTMLElement){
    this.router.navigate(['dermatologist/patients']);
    el.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnInit(): void {

    this.userService.getMyInfo().subscribe(resUser => {
    this.dermatologist =  resUser;
    
    });
  }
}

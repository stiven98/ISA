import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dermatologist-home',
  templateUrl: './dermatologist-home.component.html',
  styleUrls: ['./dermatologist-home.component.css']
})
export class DermatologistHomeComponent implements OnInit {

  dermatologist;
  constructor(
    userService : UserService
  ) {
    this.dermatologist = userService.currentUser;
   }

  ngOnInit(): void {
  }

}

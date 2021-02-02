import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Dermatologist } from '../shared/models/dermatologist';

@Component({
  selector: 'app-dermatologist-home',
  templateUrl: './dermatologist-home.component.html',
  styleUrls: ['./dermatologist-home.component.css']
})
export class DermatologistHomeComponent implements OnInit {

  contentTitle = 'Content';
  dermatologist = new Dermatologist();
  constructor(
    private userService: UserService
  ) {

   }

  ngOnInit(): void {
    this.userService.getMyInfo().subscribe(resUser => {
    this.dermatologist =  resUser;
    });
  }
}

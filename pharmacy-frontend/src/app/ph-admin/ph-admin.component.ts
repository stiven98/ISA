import { Component, OnInit } from '@angular/core';
import { ChangeUserModel } from '../change-account-info/changeUser.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ph-admin',
  templateUrl: './ph-admin.component.html',
  styleUrls: ['./ph-admin.component.css']
})
export class PhAdminComponent implements OnInit {

  phAdmin: ChangeUserModel = new ChangeUserModel();
  fetchData = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchData = true;
    this.userService.getMyInfo().subscribe(phAdmin => this.phAdmin = phAdmin);


    this.fetchData = false;

  }

}

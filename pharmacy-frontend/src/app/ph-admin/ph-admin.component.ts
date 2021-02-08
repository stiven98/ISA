import { Component, OnInit } from '@angular/core';
import { ChangeUserModel } from '../change-account-info/changeUser.model';
import { MedicalStuffService } from '../services/medical-stuff.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ph-admin',
  templateUrl: './ph-admin.component.html',
  styleUrls: ['./ph-admin.component.css']
})
export class PhAdminComponent implements OnInit {

  phAdmin: ChangeUserModel = new ChangeUserModel();
  fetchData = false;
  dermatologist = []

  constructor(private userService: UserService, private medicalStufService:MedicalStuffService) { }

  ngOnInit(): void {
    this.fetchData = true;
    this.userService.getMyInfo().subscribe(phAdmin =>{ this.phAdmin = phAdmin
    this.medicalStufService.getAllDermatologistFromPharmacy(this.phAdmin.email).subscribe((list) => {
      this.dermatologist = list;
    })
    });


    this.fetchData = false;

  }

}

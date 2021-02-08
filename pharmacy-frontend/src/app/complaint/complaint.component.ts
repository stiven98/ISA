import { Component, OnInit } from '@angular/core';
import {ComplaintModel} from './complaint.model';
import {ComplaintValidation} from '../validation-model/complaint.validation';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';
import {Route, Router} from '@angular/router';
import {PatientService} from '../services/patient.service';
import {ComplaintService} from '../services/complaint.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {

  complaintModel: ComplaintModel;
  complaintValidation: ComplaintValidation;
  medicalStuff: any [];

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private patientService: PatientService,
              private complaintService: ComplaintService) { }

  ngOnInit(): void {
    this.medicalStuff = [];
    this.complaintModel = new ComplaintModel();
    this.complaintValidation = new ComplaintValidation();
    this.userService.getMyInfo().subscribe(user => {
      this.complaintModel.emailPatient = user.email;
      if (this.authService.getRole() === 'ROLE_PATIENT') {
        this.patientService.findMedicalStuffToMark(this.complaintModel.emailPatient).subscribe(response => {
          this.medicalStuff = response;
          console.log(this.medicalStuff);
        });
      } else {
        this.router.navigate(['403']);
      }
    }, error => {
      this.authService.doLogout();
      this.router.navigate(['login']);
    });
  }

  onChangeSelect = (event) => {
    this.complaintModel.forWho = event.target.value;
  }

  onChangeSelectedMedicalStuff = (event) => {
    this.complaintModel.medicalStaffId = event.target;
  }

  createComplaint = () => {
    console.log(this.complaintModel);
    this.complaintService.saveAndFlush(this.complaintModel).subscribe();
  }

}

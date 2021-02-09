import { Component, OnInit } from '@angular/core';
import {ComplaintModel} from './complaint.model';
import {ComplaintValidation} from '../validation-model/complaint.validation';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
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
  complaintForAnswer: any [];
  validAnswer: string;

  constructor(private userService: UserService,
              public authService: AuthService,
              private router: Router,
              private patientService: PatientService,
              private complaintService: ComplaintService) { }

  ngOnInit(): void {
    this.validAnswer = 'no-validate';
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
      } else if (this.authService.getRole() === 'ROLE_SYSTEM_ADMINISTRATOR') {
        this.complaintService.findAll().subscribe(response => {
          this.complaintForAnswer = response;
          console.log(this.complaintForAnswer);
        });
      } else {
        this.router.navigate(['403']);
      }


    }, error => {
      this.authService.doLogout();
      this.router.navigate(['login']);
    });
  }

  sendAnswer = (item) => {
    if (item.answer.length < 1) {
      item.validAnswer = 'is-invalid';
      return;
    }

    this.complaintService.sendAnswer(item).subscribe(response => {
      alert('Answer has been sent!');
      this.ngOnInit();
    });
  }

  onChangeSelect = (event) => {
    this.complaintModel.forWho = event.target.value;
    this.complaintModel.medicalStaffId = 'Choose...';
    this.complaintModel.pharmacyId = 'Choose...';
    this.complaintModel.content = '';
    this.complaintValidation = new ComplaintValidation();
  }

  onChangeSelectedMedicalStuff = (event) => {
    this.complaintModel.medicalStaffId = event.target.value;
    this.complaintModel.content = '';
    this.complaintValidation = new ComplaintValidation();
  }

  onKeyDown = () => {
    this.complaintValidation = new ComplaintValidation();
    this.validAnswer = 'no-validate';
  }

  createComplaint = () => {
    if (this.complaintModel.forWho === 'Choose...') {
      this.complaintValidation.validForWho = 'is-invalid';
      return;
    }

    if (this.complaintModel.forWho === 'Pharmacy') {
      if (this.complaintModel.pharmacyId === 'Choose...') {
        this.complaintValidation.validPharmacy = 'is-invalid';
        return;
      }

      if (this.complaintModel.content.length < 1) {
        this.complaintValidation.validContent = 'is-invalid';
        return;
      }

    } else if (this.complaintModel.forWho === 'Dermatologist and pharmacist') {
      if (this.complaintModel.medicalStaffId === 'Choose...') {
        this.complaintValidation.validMedicalStuff = 'is-invalid';
        return;
      }

      if (this.complaintModel.content.length < 1) {
        this.complaintValidation.validContent = 'is-invalid';
        return;
      }

      this.complaintService.saveAndFlush(this.complaintModel).subscribe((response) => {
        alert('Complaint saved!');
        this.ngOnInit();
      });
    }
  }



}

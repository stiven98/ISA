import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PasswordsWrapper} from 'src/app/change-password/passwordsWrapper.model'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  newValid = 'no-validate';
  oldValid = 'no-validate';
  confValid = 'no-validate';
  confPassword = '';
  buttonDisabled = false;
  passwordWrapper = new PasswordsWrapper();
  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {
  }

  onKeyDownNew(){
    var regex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{6,}/g;
    const isPasswordValidFlag = regex.test(this.passwordWrapper.password);
    if(!isPasswordValidFlag){
      this.newValid = 'is-invalid';
      this.buttonDisabled = true;
    }
    else{
      this.newValid = 'no-validate';
      this.buttonDisabled = false;
    }
  }

  onKeyDownConf(){
   if(this.confPassword === this.passwordWrapper.password){
     this.confValid = 'no-validate';
     this.buttonDisabled = false;
   }
   else{
     this.confValid = 'is-invalid';
     this.buttonDisabled = true;
   }
  }

  onKeyDownOld(){
    if(this.passwordWrapper.oldPassword == null || this.passwordWrapper.oldPassword.trim() == ""){
      this.oldValid = 'is-invalid';
      this.buttonDisabled = true;
    }
    else{
      this.oldValid = 'no-validate';
      this.buttonDisabled = false;
    }
  }

  onClick(){
    this.userService.changePassword(this.passwordWrapper).subscribe(res => {
      localStorage.setItem('first_login', 'false');
      alert(res.result);
      this.router.navigate(['/']);
    });
  }

}

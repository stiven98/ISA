import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AccountInfoModel } from './accountInfo.model';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  validEmail = 'no-validate';
  validPassword = 'no-validate';
  accountInfoModel: AccountInfoModel = new AccountInfoModel();


  constructor(
    private loginService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onLogin = () => {

      if (this.validateInput()){
        this.loginService.signIn(this.accountInfoModel);
      } else  {
        console.log(this.validEmail);
        console.log(this.validPassword);

      }
    }

  validateInput = () => {
    const { username, password } = this.accountInfoModel;
    const op1 = this.isValidEmail(username);
    const op2 = this.isValidPassword(password);
    return (op1 && op2);
  }

  isValidEmail = (email: string) => {
    if (!email.match(new RegExp('.+(@).+(.com)'))){ this.validEmail = 'is-invalid'; return false; }
    return true;
  }

  isValidPassword = (password: string) => {
    if (password.length < 1) {this.validPassword = 'is-invalid'; return false; }
    return true;
  }

  onKeyDown = () => {
    this.validPassword = 'no-validate';
    this.validEmail = 'no-validate';
  }

}

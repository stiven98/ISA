import { Component, OnInit } from '@angular/core';
import { AccountInfoModel } from './accountInfo.model';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  validEmail = 'no-validate';
  validPassword = 'no-validate';
  accountInfoModel: AccountInfoModel = new AccountInfoModel();

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onLogin = () => {
    if (this.validateInput()){
      alert('Http');
    } else  {
      console.log(this.validEmail);
      console.log(this.validPassword);

    }
  }

  validateInput = () => {
    const { email, password } = this.accountInfoModel;
    const op1 = this.isValidEmail(email);
    const op2 = this.isValidPassword(password);
    return (op1 && op2);
  }

  isValidEmail = (email: string) => {
    console.log('ValidEmail');
    if (!email.match(new RegExp('.+(@).+(.com)'))){ this.validEmail = 'is-invalid'; return false; }
    return true;
  }

  isValidPassword = (password: string) => {
    console.log('ValidPassword');
    if (password.length < 8) {this.validPassword = 'is-invalid'; return false; }
    return true;
  }

  onKeyDown = () => {
    this.validPassword = 'no-validate';
    this.validEmail = 'no-validate';
  }

}

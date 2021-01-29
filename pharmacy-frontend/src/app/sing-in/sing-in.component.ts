import { Component, OnInit } from '@angular/core';
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


  constructor(private loginService: AuthService) { }

  ngOnInit(): void {
  }

  onLogin = () => {
    if (this.validateInput()){
      this.loginService.loginRequest(this.accountInfoModel).subscribe((response) =>{
        console.log(response);
      });
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
    console.log('ValidEmail');
    if (!email.match(new RegExp('.+(@).+(.com)'))){ this.validEmail = 'is-invalid'; return false; }
    return true;
  }

  isValidPassword = (password: string) => {
    console.log('ValidPassword');
    if (password.length < 4) {this.validPassword = 'is-invalid'; return false; }
    return true;
  }

  onKeyDown = () => {
    this.validPassword = 'no-validate';
    this.validEmail = 'no-validate';
  }

}

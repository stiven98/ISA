import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountInfoModel } from '../sing-in/accountInfo.model';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private config: ConfigService,
    private router: Router
    ) {
      this.access_token = localStorage.getItem('token');
  }



  private access_token = null;

  loginRequest = (accountInfoModel: AccountInfoModel) => {
    const loginHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.apiService.post(this.config.login_url, accountInfoModel, loginHeaders)
    .subscribe(res => {
      console.log('Login success');
      localStorage.setItem('token', res.accessToken);
      this.access_token = res.accessToken;
      this.userService.getMyInfo().subscribe(resUser => {
        let authorities = resUser.authorities;
        if(authorities.length > 0){
          switch(authorities[0].authority){
            case('ROLE_DERMATOLOGIST'):
              this.router.navigate(['/dermatologist']);
              break;
          }
        }else{
          alert('Login error');
          this.router.navigate(['/']);
        }
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.userService.currentUser = null;
    this.access_token = null; 
    this.router.navigate(['/login']);
}

  tokenIsPresent() {
    return this.access_token != undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }
}

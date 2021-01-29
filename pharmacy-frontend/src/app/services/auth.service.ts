import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  }

  private access_token = null;

  loginRequest = (accountInfoModel: AccountInfoModel) => {
    const loginHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.apiService.post(this.config.login_url, accountInfoModel, loginHeaders);
  }

  logout() {
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

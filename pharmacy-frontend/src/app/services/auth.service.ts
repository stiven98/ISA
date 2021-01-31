import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AccountInfoModel } from '../sing-in/accountInfo.model';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    private userService: UserService,
    private router: Router
    ) {
  }

  private access_token = null;

  signIn(user: AccountInfoModel) {
    return this.apiService.post(this.config.login_url, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.accessToken);
        this.getUserProfile().subscribe((res) => {
          this.currentUser = res;
          let authority = res.role;
          localStorage.setItem('role', authority);
          if(authority == 'ROLE_DERMATOLOGIST'){
                this.router.navigate(['/dermatologist']);
          }
        })
    });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }

  // User profile
  getUserProfile(): Observable<any> {
    return this.apiService.get(this.config.get_user_url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
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

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}

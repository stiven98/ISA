import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PharmacistsGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isLoggedIn !== true || this.authService.getRole() !== "ROLE_PHARMACIST") {
        window.alert("Access not allowed!");
        this.authService.doLogout();
        this.router.navigate(['/403']);
      }
      if(this.authService.isFirstLogin){
        window.alert("You must change your password in order to use our services");
        this.router.navigate(['/changePassword']);
      }
      return true;
    }
  }
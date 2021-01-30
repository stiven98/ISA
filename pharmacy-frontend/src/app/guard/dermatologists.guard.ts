import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class DermatologistsGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.userService.currentUser) {
        if (JSON.stringify(this.userService.currentUser.authorities).search('ROLE_DERMATOLOGIST') !== -1) {
          return true;
        } else {
          console.log('IS NOT DERMATOLOGIST');
          this.router.navigate(['/403']);
          return false;
        }
  
      } else {
        console.log('IS NOT LOGGED IN');
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
      }
  }
  
}

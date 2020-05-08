import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  /*   canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
    } */

  constructor(private router: Router) { }
  canActivate() {
    // console.log("paseeeeeeee") 
    if (localStorage.getItem('user-token')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}

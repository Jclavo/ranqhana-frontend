import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

//SERVICE
import { AuthService } from "@modules/auth/services";


@Injectable({
  providedIn: 'root'
})
export class GlobalGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return false;
    if(this.authService.isLogged())
      return true;

    return this.router.parseUrl('/');

  }
  
}

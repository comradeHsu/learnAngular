import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url : string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if( localStorage.getItem('userId') !== null) {
      return true;
    }
    localStorage.setItem('redirectUrl', url);
    this.router.navigate(['/login']);
    return false;
  }
}

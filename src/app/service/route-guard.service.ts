import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { HardCodedAuthenticationService } from './hard-coded-authentication.service';
import { BasicAuthService } from './data/basic-auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private hardCodedAuthenticationService: HardCodedAuthenticationService, private router: Router, public basicAuthService: BasicAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.basicAuthService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }

  }
}

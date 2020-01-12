import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class PreloginGaurdService implements CanActivate{

  constructor(private userService: UserServiceService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    let user = this.userService.loginUser();
    if (user) {
      this.router.navigate(["/dashboard"])
      return false;
    }
    else {
      return true;
    }
  }
}

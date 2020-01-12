import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuardServiceService implements CanActivate, CanLoad {

  constructor(private userService: UserServiceService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    let user = this.userService.loginUser();
    if (user) {
      return true;
    }
    else {
      let redirectUrl = state.url;
      this.router.navigate(["/security/login"], { queryParams: { redirectUrl: redirectUrl } });
      return false;
    }
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {

    console.log(segments)

    let user = this.userService.loginUser();
    if (user) {
      if (route.path === "")
        return false
      return true;
    }
    else {
      let redirectUrl = ""
      segments.map(segment => { return segment.path }).forEach(path => {
        redirectUrl += "/" + path
      })
      this.router.navigate([""], { queryParams: { redirectUrl: redirectUrl } });
      return false;
    }
  }
}

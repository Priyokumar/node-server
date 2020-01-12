import { Injectable } from '@angular/core';
import { IKeyValue } from '../model/IKeyVal';
import { userRoles } from '../model/constants';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private loginStatusSubject = new BehaviorSubject<Boolean>(false)

  constructor(private router: Router) { }

  public hasLoginedObs() {
    let user = this.loginUser()
    if (user)
      this.loginStatusSubject.next(true)
    return this.loginStatusSubject.asObservable()
  }

  public setHasLogined(hasLogined: Boolean) {
    this.loginStatusSubject.next(hasLogined)
  }

  public userRoles(): IKeyValue[] {
    return userRoles;
  }

  public loginUser() {

    let userStr = this.getCookie("USER");
    if (!userStr)
      return null;
    else
      return JSON.parse(this.getCookie("USER"));
  }

  public loginUserRole(): String {

    let role: String;
    let user = JSON.parse(this.getCookie("USER"));

    if (user && user.roles) {
      role = user.roles[0].name;
    }

    return role;
  }

  public logout() {
    this.deleteCookie("USER")
    this.setHasLogined(false)
    this.router.navigate([""])
  }

  // ===============COOKIES==================

  //set Cookie
  public setCookie(key: string, value: any) {
    const d = new Date();
    d.setHours(d.getHours() + 1);
    const expires = "expires=" + d.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
  }

  public getCookie(key: string) {
    const name = key + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  public deleteCookie(key: string) {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/';
  }

}

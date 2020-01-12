import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../../service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: String;
  isLoading: boolean = false;
  loginForm: FormGroup;
  redirectUrl: String

  constructor(private http: HttpClient, private router: Router, private userService: UserServiceService, private activatedRoute: ActivatedRoute) {

    this.loginForm = new FormGroup({
      userName: this.userName,
      password: this.password
    })

    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.redirectUrl = queryParams.redirectUrl
    })

  }

  userName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  ngOnInit() {
  }

  signIn() {

    if (!this.loginForm.valid)
      return;

    this.isLoading = true;

    let login = this.loginForm.value;

    let resp = null;
    this.http.post("http://localhost:8080/security/login", login).subscribe(data => {
      resp = data;

      if (resp && !resp.apiMessage.error) {

        this.userService.deleteCookie("USER");
        this.userService.setCookie("USER", JSON.stringify(resp.data));
        this.userService.setHasLogined(true)

        if (this.redirectUrl)
          this.router.navigate([this.redirectUrl])
        else
          this.router.navigate(["/dashboard"])
      } else {
        this.errorMessage = resp.apiMessage.detail;
      }
      this.isLoading = false;
    }, err => {

      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message

      this.isLoading = false;
      console.error(err);
    })
  }
}

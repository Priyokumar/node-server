import { Component, OnInit } from '@angular/core';
import { IUser, IMenu } from 'src/app/model/security';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  errorMessage: String;
  userId: String;
  user: IUser;

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params.uid;
    })
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {

    this.http.get(ApiEndpoint.USERS + "/" + this.userId).subscribe(data => {

      this.user = data["data"]

    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

  delete() {

    this.http.delete(ApiEndpoint.USERS + "/" + this.userId).subscribe(data => {
      this.router.navigate(["/security/users"]);
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

  edit() {
    this.router.navigate(["/security/users/" + this.userId + "/edit"]);
  }

}

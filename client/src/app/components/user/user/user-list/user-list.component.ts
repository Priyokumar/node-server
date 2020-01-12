import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { IUser } from 'src/app/model/security';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public errorMessage: String;
  public userColumns: string[] = ["id", "name", "userName", "mobile", "email", "status", "action"];
  public userDataSource: MatTableDataSource<IUser>;
  public users: IUser[] = [];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {

    let resp;
    this.http.get(ApiEndpoint.USERS).subscribe(data => {

      resp = data;
      if (resp && !resp.apiMessage.error) {

        this.users = resp.data;
        this.userDataSource = new MatTableDataSource(this.users);

        if (!this.users)
          this.errorMessage = "No user found";

      } else {
        this.errorMessage = resp.apiMessage.detail;
      }

    }, err => {
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message

      console.error(err);
    })

  }

  public onClickRow(userId: Number) {
    this.router.navigate(["/security/users/" + userId + "/view"]);
  }

  public onDeleteRow(userId: Number) {

    this.http.delete(ApiEndpoint.USERS + "/" + userId).subscribe(data => {
      this.userDataSource = new MatTableDataSource([])
      this.getUsers();
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

}

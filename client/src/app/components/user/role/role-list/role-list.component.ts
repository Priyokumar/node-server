import { Component, OnInit } from '@angular/core';
import { IRole } from 'src/app/model/security';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {


  public errorMessage: String;
  public roleColumns: string[] = ["id", "name", "desc", "action"];
  public roleDataSource: MatTableDataSource<IRole>;
  public roles: IRole[] = [];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getRoles();
  }

  private getRoles() {

    let resp;
    this.http.get(ApiEndpoint.ROLES).subscribe(data => {

      resp = data;
      if (resp && !resp.apiMessage.error) {

        this.roles = resp.data;
        this.roleDataSource = new MatTableDataSource(this.roles);

        if (!this.roles)
          this.errorMessage = "No role found";

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

  public onClickRow(roleId: Number) {

    this.router.navigate(["/security/roles/" + roleId + "/view"]);

  }

  public onDeleteRow(roleId: Number) {

    this.http.delete(ApiEndpoint.ROLES + "/" + roleId).subscribe(data => {
      this.roleDataSource = new MatTableDataSource([])
      this.getRoles();
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }
}

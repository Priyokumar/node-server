import { Component, OnInit } from '@angular/core';
import { IRole, IMenu } from 'src/app/model/security';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MenuDialogComponent } from '../menu-dialog/menu-dialog.component';
import { MenuViewDialogComponent } from '../menu-view-dialog/menu-view-dialog.component';

@Component({
  selector: 'app-role-view',
  templateUrl: './role-view.component.html',
  styleUrls: ['./role-view.component.css']
})
export class RoleViewComponent implements OnInit {

  errorMessage: String;
  roleId: String;
  role: IRole;

  public menuColumns: string[] = ["id", "title", "order", "icon", "hasSubmenu"];
  public menuDataSource: MatTableDataSource<IMenu>;
  public menus: IMenu[] = [];

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) {
    this.activatedRoute.params.subscribe(params => {
      this.roleId = params.roleId;
    })
  }

  ngOnInit() {
    this.getRole();
  }

  getRole() {

    this.http.get(ApiEndpoint.ROLES + "/" + this.roleId).subscribe(data => {

      this.role = data["data"]
      this.menus = this.role.menus
      this.menuDataSource = new MatTableDataSource(this.menus)

    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

  delete() {

    this.http.delete(ApiEndpoint.ROLES + "/" + this.roleId).subscribe(data => {
      this.router.navigate(["/security/roles"]);
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

  edit() {
    this.router.navigate(["/security/roles/" + this.roleId + "/edit"]);
  }

  onClickRow(menu: IMenu) {
    let dialogRef = this.dialog.open(MenuViewDialogComponent, { width: '60%', data: menu })
      .afterClosed().subscribe(data => {
        if (data) {
        }
      });
  }

}

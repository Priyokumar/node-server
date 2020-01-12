import { Component, OnInit } from '@angular/core';
import { IRole, IMenu } from 'src/app/model/security';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MenuDialogComponent } from '../menu-dialog/menu-dialog.component';

@Component({
  selector: 'app-role-create-edit',
  templateUrl: './role-create-edit.component.html',
  styleUrls: ['./role-create-edit.component.css', '../../../../../assets/css/form-common.css']
})
export class RoleCreateEditComponent implements OnInit {

  roleId: number
  errorMessage: String

  public menuColumns: string[] = ["id", "title", "order", "icon", "hasSubmenu", "action"];
  public menuDataSource: MatTableDataSource<IMenu>;
  public menus: IMenu[] = [];

  roleForm: FormGroup
  role: IRole
  sideNavs: IMenu[] = []
  idFormCtl = new FormControl('', null)
  nameFormCtl = new FormControl('', Validators.required)
  descFormCtl = new FormControl('', Validators.required)

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {

    this.roleForm = new FormGroup({
      nameFormCtl: this.nameFormCtl,
      descFormCtl: this.descFormCtl
    })

    this.activatedRoute.params.subscribe(params => {
      this.roleId = params.roleId
      if (this.roleId)
        this.getRoleId()
    })

  }

  ngOnInit() {
  }

  public getRoleId(): any {
    this.http.get(ApiEndpoint.ROLES + "/" + this.roleId).subscribe(data => {

      this.role = data["data"]
      this.menus = this.role.menus
      this.menuDataSource = new MatTableDataSource(this.menus)
      this.setForm()
    }, err => {
      console.error(err)
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail
      else
        this.errorMessage = err.message
    })
  }

  public save() {

    let rolePayload: IRole = {

      id: this.idFormCtl.value,
      name: this.nameFormCtl.value,
      desc: this.descFormCtl.value,
      menus: this.menus


    }

    this.saveOrUpdateHttpObservable(rolePayload).subscribe(data => {

      this.router.navigate(["/security/roles"]);

    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message
    })
  }

  private saveOrUpdateHttpObservable(rolePayload: IRole) {

    if (this.roleId) {
      return this.http.put(ApiEndpoint.ROLES + "/" + this.roleId, rolePayload);
    }
    else {
      return this.http.post(ApiEndpoint.ROLES, rolePayload);
    }
  }

  public setForm() {

    this.idFormCtl.setValue(this.role.id)
    this.nameFormCtl.setValue(this.role.name)
    this.descFormCtl.setValue(this.role.desc)
  }

  public addMenu() {
    let dialogRef = this.dialog.open(MenuDialogComponent, { width: '60%' })
      .afterClosed().subscribe(data => {
        if (data) {
          if (!this.menus)
            this.menus = []
          this.menus.push(data);
          this.menuDataSource = new MatTableDataSource(this.menus);
        }
      });
  }

  public onDelete(index: number) {
    this.menus.splice(index, 1);
    this.menuDataSource = new MatTableDataSource(this.menus);
  }

  public edit(index: number, menu: IMenu) {
    let dialogRef = this.dialog.open(MenuDialogComponent, { width: '60%', data: menu })
      .afterClosed().subscribe(data => {
        if (data) {
          this.menus[index] = data;
          this.menuDataSource = new MatTableDataSource(this.menus);
        }
      });
  }

}

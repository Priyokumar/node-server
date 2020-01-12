import { Component, OnInit } from '@angular/core';
import { IUser, IRole, UserStatuses } from 'src/app/model/security';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from 'src/app/model/employeeModels';

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.css', '../../../../../assets/css/form-common.css']
})
export class UserCreateEditComponent implements OnInit {

  userId: number
  errorMessage: String
  userStatuses = UserStatuses

  addedRoles: IRole[] = []

  userForm: FormGroup
  user: IUser
  roles: IRole[] = []
  employees: IEmployee[] = []

  idFormCtl = new FormControl('', null)
  userNameFormCtl = new FormControl('', Validators.required)
  firstNameFormCtl = new FormControl('', Validators.required)
  lastNameFormCtl = new FormControl('', Validators.required)
  emailFormCtl = new FormControl('', Validators.required)
  mobileFormCtl = new FormControl('', Validators.required)
  linkedIdFormCtl = new FormControl('', Validators.required)
  statusFormCtl = new FormControl('', null)
  roleFormCtl = new FormControl('', Validators.required)
  employeeFormCtl = new FormControl('', Validators.required)

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {

    this.userForm = new FormGroup({

      userNameFormCtl: this.userNameFormCtl,
      firstNameFormCtl: this.firstNameFormCtl,
      lastNameFormCtl: this.lastNameFormCtl,
      emailFormCtl: this.emailFormCtl,
      employeeFormCtl: this.employeeFormCtl

    })

    this.activatedRoute.params.subscribe(params => {
      this.userId = params.uid
      if (this.userId) {
        this.getUserId()
      }
    })
  }

  ngOnInit() {

    if (!this.userId) {
      this.statusFormCtl.disable()
    }

    this.getEmployees()
    this.getRoles()
  }

  private getRoles() {

    this.http.get(ApiEndpoint.ROLES).subscribe(data => {
      this.roles = data["data"];
    }, err => {
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail
      else
        this.errorMessage = err.message
      console.error(err);
    })
  }

  public getUserId(): any {
    this.http.get(ApiEndpoint.USERS + "/" + this.userId).subscribe(data => {
      this.user = data["data"]
      this.setForm()
    }, err => {
      console.error(err)
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail
      else
        this.errorMessage = err.message
    })
  }

  private getEmployees() {
    this.http.get(ApiEndpoint.EMPLOYEES).subscribe(data => {
      this.employees = data["data"];
      let employee = this.employees.find(elmnt => { return elmnt.id == this.user.linkedId })
      this.employeeFormCtl.setValue(employee.id)
    }, err => {
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail
      else
        this.errorMessage = err.message
      console.error(err)
    })
  }

  public save() {

    let userPayload: IUser = {

      id: this.idFormCtl.value,
      email: this.emailFormCtl.value,
      firstName: this.firstNameFormCtl.value,
      lastName: this.lastNameFormCtl.value,
      linkedId: this.linkedIdFormCtl.value,
      mobile: this.mobileFormCtl.value,
      status: this.statusFormCtl.value,
      userName: this.userNameFormCtl.value,
      roles: this.addedRoles,

    }

    this.saveOrUpdateHttpObservable(userPayload).subscribe(data => {

      let apiMessage = data["apiMessage"]

      if (apiMessage.error) {
        this.errorMessage = apiMessage.detail
        return;
      }

      this.router.navigate(["/security/users"])
    }, err => {

      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail
      else
        this.errorMessage = err.message
    })
  }

  private saveOrUpdateHttpObservable(userPayload: IUser) {

    if (this.userId) {
      return this.http.put(ApiEndpoint.USERS + "/" + this.userId, userPayload)
    }
    else {
      return this.http.post(ApiEndpoint.USERS, userPayload)
    }
  }

  public setForm() {

    this.idFormCtl.setValue(this.user.id)
    this.userNameFormCtl.setValue(this.user.userName)
    this.firstNameFormCtl.setValue(this.user.firstName)
    this.lastNameFormCtl.setValue(this.user.lastName)
    this.emailFormCtl.setValue(this.user.email)
    this.mobileFormCtl.setValue(this.user.mobile)
    this.linkedIdFormCtl.setValue(this.user.linkedId)
    this.statusFormCtl.setValue(this.user.status)
    this.addedRoles = this.user.roles

  }

  public onSelectEmployee(selectedEmployeeId: Number) {

    let employee = this.employees.find(elmnt => { return elmnt.id == selectedEmployeeId })
    this.firstNameFormCtl.setValue(employee.firstName)
    this.lastNameFormCtl.setValue(employee.lastName)
    this.linkedIdFormCtl.setValue(employee.id)
    this.emailFormCtl.setValue(employee.email)

  }

  public addRole() {

    let addingRole: IRole = this.roleFormCtl.value
    if (!addingRole)
      return

    let indx = this.addedRoles.findIndex(elmnt => { return elmnt.id == addingRole.id })
    if (indx >= 0)
      return
    this.addedRoles.push(this.roleFormCtl.value)
  }

  public remove(addedRole: IRole) {
    let indx = this.addedRoles.findIndex(elmnt => { return elmnt.id == addedRole.id })
    this.addedRoles.splice(indx, 1)
  }
}

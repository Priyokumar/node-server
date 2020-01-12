import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';
import { IEmployee } from 'src/app/model/employeeModels';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  errorMessage: String;
  employeesColumns: string[] = ["id", "name", "designation", "status", "action"]
  employeesDataSource: MatTableDataSource<IBasicEmployeeDetails>;
  employees: IEmployee[] = []
  basicEmployeeDetails: IBasicEmployeeDetails[] = []

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getEmployees();
  }

  private getEmployees() {

    let resp;
    this.http.get(ApiEndpoint.EMPLOYEES).subscribe(data => {

      resp = data;
      if (resp && !resp.apiMessage.error) {

        this.employees = resp.data
        this.setBasicEmployeeDetails()
        if (!this.employees)
          this.errorMessage = "No Employee found"

      } else {
        this.errorMessage = resp.apiMessage.detail
      }

    }, err => {
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail
      else
        this.errorMessage = err.message

      console.error(err)
    })

  }

  public onClickRow(empId: Number) {

    this.router.navigate(["/employee/" + empId + "/view"])

  }

  public onDeleteEmployee(empId: Number) {

    this.http.delete(ApiEndpoint.EMPLOYEES + "/" + empId).subscribe(data => {
      this.employees = []
      this.employeesDataSource = new MatTableDataSource([])
      this.getEmployees();
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail
      else
        this.errorMessage = err.message
    })
  }

  setBasicEmployeeDetails() {

    this.employees.forEach(employee => {

      let fname = employee.firstName ? employee.firstName : ""
      let mname = employee.middleName ? employee.middleName : ""
      let lname = employee.lastName ? employee.lastName : ""
      let name = fname + " " + mname + " " + lname

      let basicEmployeeDetail: IBasicEmployeeDetails = {
        designation: employee.designation,
        id: employee.id,
        name: name,
        status: employee.status
      }
      this.basicEmployeeDetails.push(basicEmployeeDetail)
    })
    this.employeesDataSource = new MatTableDataSource(this.basicEmployeeDetails)
  }

  applyFilter(filterValue: string) {
    this.employeesDataSource.filter = filterValue.trim().toLowerCase();
  }

}

interface IBasicEmployeeDetails {
  id: Number
  name: String
  designation: String
  status: String
}

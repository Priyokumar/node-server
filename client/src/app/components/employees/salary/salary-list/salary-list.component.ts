import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { IEmployeeSalary } from 'src/app/model/employeeModels';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})
export class SalaryListComponent implements OnInit {

  errorMessage: String;
  public employeeSalaryColumns: string[] = ["id", "name", "designation", "status", "salary"]
  public employeeSalaryDataSource: MatTableDataSource<IEmployeeSalary>;
  public employeeSalaries: IEmployeeSalary[] = []
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getEmployeeSalaries();
  }

  private getEmployeeSalaries() {

    let resp;
    this.http.get(ApiEndpoint.EMPLOYEE_SALARY).subscribe(data => {

      resp = data;
      if (resp && !resp.apiMessage.error) {

        this.employeeSalaries = resp.data;
        this.employeeSalaryDataSource = new MatTableDataSource(this.employeeSalaries)

        if (!this.employeeSalaries)
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

  public onClickRow(employeeSalaryId: Number) {

    this.router.navigate(["/employee/salaries/" + employeeSalaryId + "/view"])

  }

  public onDeleteEmployee(employeeSalaryId: Number) {

    this.http.delete(ApiEndpoint.EMPLOYEE_SALARY + "/" + employeeSalaryId).subscribe(data => {
      this.employeeSalaries = []
      this.employeeSalaryDataSource = new MatTableDataSource([])
      this.getEmployeeSalaries();
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail
      else
        this.errorMessage = err.message
    })
  }
}

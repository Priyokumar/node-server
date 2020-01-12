import { Component, OnInit } from '@angular/core';
import { IPaySalary } from 'src/app/model/employeeModels';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';

@Component({
  selector: 'app-salary-payment-list',
  templateUrl: './salary-payment-list.component.html',
  styleUrls: ['./salary-payment-list.component.css']
})
export class SalaryPaymentListComponent implements OnInit {

  errorMessage: String;
  public paySalaryColumns: string[] = ["id", "name", "payDate", "paidAmount", "dueAmount", "salaryAmount", "action"]
  public paySalaryDataSource: MatTableDataSource<IPaySalary>;
  public paySalaries: IPaySalary[] = []
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.paySalaryDataSource = new MatTableDataSource([])
    this.getPaySalaries();
  }

  private getPaySalaries() {

    let resp;
    this.http.get(ApiEndpoint.PAY_SALARY).subscribe(data => {

      resp = data;
      if (resp && !resp.apiMessage.error) {

        this.paySalaries = resp.data;
        this.paySalaryDataSource = new MatTableDataSource(this.paySalaries)

        if (!this.paySalaries)
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

  public onClickRow(paySalId: Number) {

    this.router.navigate(["/employee/pay-salaries/" + paySalId + "/view"])

  }

  public onDelete(paySalId: Number) {

    this.http.delete(ApiEndpoint.EMPLOYEE_SALARY + "/" + paySalId).subscribe(data => {
      this.paySalaries = []
      this.paySalaryDataSource = new MatTableDataSource([])
      this.getPaySalaries();
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail
      else
        this.errorMessage = err.message
    })
  }

  public getName(paySalary: IPaySalary) {

    let name = ""
    let emp = paySalary.employeeSalary.employee
    if (emp) {

      let firstName = emp.firstName || ""
      let middleName = emp.middleName || ""
      let lastName = emp.lastName || ""
      name = firstName + " " + middleName + " " + lastName

    }
    return name
  }

}

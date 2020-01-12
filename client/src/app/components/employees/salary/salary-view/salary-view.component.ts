import { Component, OnInit } from '@angular/core';
import { IEmployeeSalary } from 'src/app/model/employeeModels';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-salary-view',
  templateUrl: './salary-view.component.html',
  styleUrls: ['./salary-view.component.css', '../../../../../assets/css/form-common.css']
})
export class SalaryViewComponent implements OnInit {

  errorMessage: String
  empSalaryId: Number
  empSalary: IEmployeeSalary

  updateMode: Boolean = false
  imageUrl: String

  salaryAmountFormCtrl = new FormControl('', null)

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.empSalaryId = params.salId;
    })
  }

  ngOnInit() {
    this.getEmployeeSalary()
  }

  getEmployeeSalary() {

    let resp;
    this.http.get(ApiEndpoint.EMPLOYEE_SALARY + "/" + this.empSalaryId).subscribe(data => {
      resp = data;
      this.empSalary = resp.data;
      this.imageUrl = ApiEndpoint.DOCUMENT + "/" + this.empSalary.employee.profilePic.id + "/view"

    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

  update() {
    this.updateMode = true
    this.salaryAmountFormCtrl.setValue(this.empSalary.salaryAmount)
  }

  cancel() {
    this.updateMode = false
    this.salaryAmountFormCtrl.setValue(null)
    this.errorMessage = null
  }

  updateSalaryAmount() {

    let employeeSalary: IEmployeeSalary = {
      employee: null,
      id: null,
      salaryAmount: this.salaryAmountFormCtrl.value
    }

    this.http.put(ApiEndpoint.EMPLOYEE_SALARY + "/" + this.empSalaryId + "/update-salary", employeeSalary).subscribe(data => {

      this.updateMode = false
      this.getEmployeeSalary()

    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

}

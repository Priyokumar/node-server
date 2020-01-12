import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IEmployee, IPaySalary, IEmployeeSalary } from 'src/app/model/employeeModels';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-salary-payment-create-edit',
  templateUrl: './salary-payment-create-edit.component.html',
  styleUrls: ['./salary-payment-create-edit.component.css', '../../../../../assets/css/form-common.css']
})
export class SalaryPaymentCreateEditComponent implements OnInit {

  paySalaryId: number
  errorMessage: String

  paySalaryForm: FormGroup
  paySalary: IPaySalary
  employees: IEmployee[] = []
  selectedEmployeeSalary: IEmployeeSalary

  idFormCtl = new FormControl('', null)
  nameFormCtl = new FormControl('', Validators.required)
  payDateFormCtl = new FormControl('', Validators.required)
  paidAmountFormCtl = new FormControl('', Validators.required)
  dueAmountFormCtl = new FormControl('', null)
  salaryAmountFormCtl = new FormControl('', Validators.required)
  employeeFormCtl = new FormControl('', Validators.required)

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {

    this.paySalaryForm = new FormGroup({

      employeeFormCtl: this.employeeFormCtl,
      payDateFormCtl: this.payDateFormCtl,
      paidAmountFormCtl: this.paidAmountFormCtl,
      dueAmountFormCtl: this.dueAmountFormCtl,
      salaryAmountFormCtl: this.salaryAmountFormCtl,

    })

    this.activatedRoute.params.subscribe(params => {
      this.paySalaryId = params.uid
      if (this.paySalaryId) {
        this.getPaySalary()
      }
    })

    this.paidAmountFormCtl.valueChanges.subscribe(paidAmount => {

      let salaryAmount = this.salaryAmountFormCtl.value
      this.dueAmountFormCtl.setValue(salaryAmount - paidAmount)

    })
  }

  ngOnInit() {
    this.getEmployees()
  }

  public getPaySalary(): any {
    this.http.get(ApiEndpoint.PAY_SALARY + "/" + this.paySalaryId).subscribe(data => {
      this.paySalary = data["data"]
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
    }, err => {
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail
      else
        this.errorMessage = err.message
      console.error(err)
    })
  }

  public save() {

    let datePipe = new DatePipe("en-US");
    let paySalaryPayload: IPaySalary = {

      id: this.idFormCtl.value,
      payDate: datePipe.transform(this.payDateFormCtl.value, 'MM/dd/yyyy'),
      dueAmount: this.dueAmountFormCtl.value,
      employeeSalary: this.selectedEmployeeSalary,
      paidAmount: this.paidAmountFormCtl.value

    }

    this.saveOrUpdateHttpObservable(paySalaryPayload).subscribe(data => {

      let apiMessage = data["apiMessage"]

      if (apiMessage.error) {
        this.errorMessage = apiMessage.detail
        return;
      }

      this.router.navigate(["/employee/pay-salaries"])
    }, err => {

      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail
      else
        this.errorMessage = err.message
    })
  }

  private saveOrUpdateHttpObservable(paySalaryPayload: IPaySalary) {

    if (this.paySalaryId) {
      return this.http.put(ApiEndpoint.PAY_SALARY + "/" + this.paySalaryId, paySalaryPayload)
    }
    else {
      return this.http.post(ApiEndpoint.PAY_SALARY, paySalaryPayload)
    }
  }

  public setForm() {

    this.idFormCtl.setValue(this.paySalary.id)
    this.payDateFormCtl.setValue(moment(<string>this.paySalary.payDate))
    this.paidAmountFormCtl.setValue(this.paySalary.paidAmount)
    this.dueAmountFormCtl.setValue(this.paySalary.dueAmount)

    let empSalary = this.paySalary.employeeSalary
    if (empSalary) {
      this.salaryAmountFormCtl.setValue(empSalary.salaryAmount)

      let emp = empSalary.employee
      if (emp) {

        let firstName = emp.firstName || ""
        let middleName = emp.middleName || ""
        let lastName = emp.lastName || ""
        this.nameFormCtl.setValue(firstName + " " + middleName + " " + lastName)
        this.employeeFormCtl.setValue(emp.id)
      }
    }



  }

  public onSelectEmployee(selectedEmployeeId: Number) {

    let employee = this.employees.find(elmnt => { return elmnt.id == selectedEmployeeId })
    let firstName = employee.firstName || ""
    let middleName = employee.middleName || ""
    let lastName = employee.lastName || ""
    this.nameFormCtl.setValue(firstName + " " + middleName + " " + lastName)

    this.getEmployeeSalaryByEmpId(employee.id)

  }

  private getEmployeeSalaryByEmpId(empId: Number) {
    this.http.get(ApiEndpoint.EMPLOYEE_SALARY + "/" + empId + "/employee").subscribe(data => {
      this.selectedEmployeeSalary = data["data"];
      if (this.selectedEmployeeSalary)
        this.salaryAmountFormCtl.setValue(this.selectedEmployeeSalary.salaryAmount)
    }, err => {
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail
      else
        this.errorMessage = err.message
      console.error(err)
    })
  }

}

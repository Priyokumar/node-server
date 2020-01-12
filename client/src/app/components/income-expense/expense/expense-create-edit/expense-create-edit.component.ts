import { Component, OnInit } from '@angular/core';
import { IExpense, ExpenseTypes } from 'src/app/model/income-expense.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';
import { IKeyValue } from 'src/app/model/student.model';

@Component({
  selector: 'app-expense-create-edit',
  templateUrl: './expense-create-edit.component.html',
  styleUrls: ['./expense-create-edit.component.css', '../../../../../assets/css/form-common.css']
})
export class ExpenseCreateEditComponent implements OnInit {

  expenseId: number
  errorMessage: String

  expenseForm: FormGroup
  expense: IExpense
  expenseTypes: IKeyValue[] = ExpenseTypes

  idFormCtl = new FormControl('', null)
  refNoFormCtl = new FormControl('', null)
  amountFormCtl = new FormControl('', Validators.required)
  expenseTypeFormCtl = new FormControl('', Validators.required)
  expenseDetailsFormCtl = new FormControl('', Validators.required)
  commentsFormCtl = new FormControl('', null)
  expenseDateFormCtl = new FormControl('', Validators.required)

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {

    this.expenseForm = new FormGroup({
      refNoFormCtl: this.refNoFormCtl,
      amountFormCtl: this.amountFormCtl,
      expenseTypeFormCtl: this.expenseTypeFormCtl,
      expenseDetailsFormCtl: this.expenseDetailsFormCtl,
      commentsFormCtl: this.commentsFormCtl,
      expenseDateFormCtl: this.expenseDateFormCtl
    })

    this.activatedRoute.params.subscribe(params => {
      this.expenseId = params.expId
      if (this.expenseId)
        this.getExpense()
    })

    this.refNoFormCtl.disable()
    this.expenseDateFormCtl.disable()
  }

  ngOnInit() {
  }

  public getExpense(): any {
    this.http.get(ApiEndpoint.EXPENSES + "/" + this.expenseId).subscribe(data => {

      this.expense = data["data"]
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

    let expensePayload: IExpense = {

      amount: this.amountFormCtl.value,
      comments: this.commentsFormCtl.value,
      expenseDate: this.expenseDateFormCtl.value,
      expenseDetails: this.expenseDetailsFormCtl.value,
      expenseType: this.expenseTypeFormCtl.value,
      id: this.idFormCtl.value,
      refNo: this.refNoFormCtl.value

    }

    this.saveOrUpdateHttpObservable(expensePayload).subscribe(data => {

      this.router.navigate(["/income-expense/expenses"]);

    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message
    })
  }

  private saveOrUpdateHttpObservable(expensePayload: IExpense) {
    if (this.expenseId) {
      return this.http.put(ApiEndpoint.EXPENSES + "/" + this.expenseId, expensePayload);
    }
    else {
      return this.http.post(ApiEndpoint.EXPENSES, expensePayload);
    }
  }

  public setForm() {

    this.idFormCtl.setValue(this.expense.id)
    this.refNoFormCtl.setValue(this.expense.refNo)
    this.amountFormCtl.setValue(this.expense.amount)
    this.expenseTypeFormCtl.setValue(this.expense.expenseType)
    this.expenseDetailsFormCtl.setValue(this.expense.expenseDetails)
    this.commentsFormCtl.setValue(this.expense.comments)
    this.expenseDateFormCtl.setValue(this.expense.expenseDate)
  }

}

import { Component, OnInit } from '@angular/core';
import { IExpense } from 'src/app/model/income-expense.model';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  public errorMessage: String;
  public expenseColumns: string[] = ["id", "refNo", "amount", "expenseType", "expenseDetails", "comments", "expenseDate", "action"];
  public expenseDataSource: MatTableDataSource<IExpense>;
  public expenses: IExpense[] = [];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getExpenses();
  }

  private getExpenses() {

    let resp;
    this.http.get(ApiEndpoint.EXPENSES).subscribe(data => {

      resp = data;
      if (resp && !resp.apiMessage.error) {

        this.expenses = resp.data;
        this.expenseDataSource = new MatTableDataSource(this.expenses);

        if (!this.expenses)
          this.errorMessage = "No expense found";

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

  public onClickRow(expenseId: Number) {

    this.router.navigate(["/income-expense/expenses/" + expenseId + "/view"]);

  }

  public onDeleteRow(expenseId: Number) {

    this.http.delete(ApiEndpoint.EXPENSES + "/" + expenseId).subscribe(data => {
      this.expenseDataSource = new MatTableDataSource([])
      this.getExpenses();
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }


}

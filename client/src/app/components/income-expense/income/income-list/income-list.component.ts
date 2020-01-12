import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { IIncome } from 'src/app/model/income-expense.model';
import { Router } from '@angular/router';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {

  public errorMessage: String;
  public incomeColumns: string[] = ["id", "refNo", "amount", "incomeType", "incomeDetails", "comments", "incomeDate", "action"];
  public incomeDataSource: MatTableDataSource<IIncome>;
  public incomes: IIncome[] = [];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getIncomes();
  }

  private getIncomes() {

    let resp;
    this.http.get(ApiEndpoint.INCOMES).subscribe(data => {

      resp = data;
      if (resp && !resp.apiMessage.error) {

        this.incomes = resp.data;
        this.incomeDataSource = new MatTableDataSource(this.incomes);

        if (!this.incomes)
          this.errorMessage = "No income found";

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

  public onClickRow(incomeId: Number) {

    this.router.navigate(["/income-expense/incomes/" + incomeId + "/view"]);

  }

  public onDeleteRow(incomeId: Number) {

    this.http.delete(ApiEndpoint.INCOMES + "/" + incomeId).subscribe(data => {
      this.incomeDataSource = new MatTableDataSource([])
      this.getIncomes();
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { IIncome } from 'src/app/model/income-expense.model';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiEndpoint } from 'src/app/model/apiEndpoint';

@Component({
  selector: 'app-income-view',
  templateUrl: './income-view.component.html',
  styleUrls: ['./income-view.component.css']
})
export class IncomeViewComponent implements OnInit {

  errorMessage: String;
  incomeId: String;
  income: IIncome;

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.incomeId = params.incId;
    })
  }

  ngOnInit() {
    this.getIncome();
  }

  getIncome() {

    this.http.get(ApiEndpoint.INCOMES + "/" + this.incomeId).subscribe(data => {

      this.income = data["data"]

    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

  delete() {

    this.http.delete(ApiEndpoint.INCOMES + "/" + this.incomeId).subscribe(data => {
      this.router.navigate(["/income-expense/incomes"]);
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage)
        this.errorMessage = err.error.apiMessage.detail;
      else
        this.errorMessage = err.message;
    })
  }

  edit() {
    this.router.navigate(["/income-expense/incomes/" + this.incomeId + "/edit"]);
  }

}

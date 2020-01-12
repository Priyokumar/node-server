import { Routes, RouterModule } from '@angular/router';
import { ExpenseListComponent } from '../components/income-expense/expense/expense-list/expense-list.component';
import { ExpenseViewComponent } from '../components/income-expense/expense/expense-view/expense-view.component';
import { ExpenseCreateEditComponent } from '../components/income-expense/expense/expense-create-edit/expense-create-edit.component';
import { IncomeListComponent } from '../components/income-expense/income/income-list/income-list.component';
import { IncomeViewComponent } from '../components/income-expense/income/income-view/income-view.component';
import { IncomeCreateEditComponent } from '../components/income-expense/income/income-create-edit/income-create-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDateModule } from '../components/shared/custom-date/custom-date.module';


const routes: Routes = [

  // Expense
  { path: "expenses", component: ExpenseListComponent },
  { path: "expenses/:expId/view", component: ExpenseViewComponent },
  { path: "expense-create", component: ExpenseCreateEditComponent },
  { path: "expenses/:expId/edit", component: ExpenseCreateEditComponent },

  // Income
  { path: "incomes", component: IncomeListComponent },
  { path: "incomes/:incId/view", component: IncomeViewComponent },
  { path: "income-create", component: IncomeCreateEditComponent },
  { path: "incomes/:incId/edit", component: IncomeCreateEditComponent },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CustomDateModule
  ],
  declarations: [

    ExpenseListComponent,
    ExpenseViewComponent,
    ExpenseCreateEditComponent,
    IncomeCreateEditComponent,
    IncomeListComponent,
    IncomeViewComponent

  ]
})
export class IncomeExpenseModule { }

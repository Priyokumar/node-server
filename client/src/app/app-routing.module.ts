import { Routes, RouterModule } from '@angular/router';
import { LoginAuthGuardServiceService } from './service/login-auth-guard-service.service';
import { NgModule } from '@angular/core';
import { PreloginGaurdService } from './service/prelogin-gaurd.service';

const routes: Routes = [

  { path: "", loadChildren: "./modules/auth.module#AuthModule", canActivate: [PreloginGaurdService] },
  { path: "dashboard", loadChildren: "./modules/dashboard.module#DashboardModule", canLoad: [LoginAuthGuardServiceService] },
  { path: "employee", loadChildren: "./modules/employees.module#EmployeesModule", canLoad: [LoginAuthGuardServiceService] },
  { path: "income-expense", loadChildren: "./modules/income-expense.module#IncomeExpenseModule", canLoad: [LoginAuthGuardServiceService] },
  { path: "maintenance", loadChildren: "./modules/maintenance.module#MaintenanceModule", canLoad: [LoginAuthGuardServiceService] },
  { path: "security", loadChildren: "./modules/security.module#SecurityModule", canLoad: [LoginAuthGuardServiceService] },
  { path: "student", loadChildren: "./modules/students.module#StudentsModule", canLoad: [LoginAuthGuardServiceService] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from '../components/employees/employee/employee-list/employee-list.component';
import { EmployeeViewComponent } from '../components/employees/employee/employee-view/employee-view.component';
import { EmployeeCreateEditComponent } from '../components/employees/employee/employee-create-edit/employee-create-edit.component';
import { EmployeeAttendenceListComponent } from '../components/employees/employee-attendence/employee-attendence-list/employee-attendence-list.component';
import { SalaryListComponent } from '../components/employees/salary/salary-list/salary-list.component';
import { SalaryViewComponent } from '../components/employees/salary/salary-view/salary-view.component';
import { SalaryCreateEditComponent } from '../components/employees/salary/salary-create-edit/salary-create-edit.component';
import { SalaryPaymentListComponent } from '../components/employees/salary-payment/salary-payment-list/salary-payment-list.component';
import { SalaryPaymentViewComponent } from '../components/employees/salary-payment/salary-payment-view/salary-payment-view.component';
import { SalaryPaymentCreateEditComponent } from '../components/employees/salary-payment/salary-payment-create-edit/salary-payment-create-edit.component';
import { TeachingStaffListComponent } from '../components/employees/staff/teaching-staff/teaching-staff-list/teaching-staff-list.component';
import { TeachingStaffViewComponent } from '../components/employees/staff/teaching-staff/teaching-staff-view/teaching-staff-view.component';
import { TeachingStaffCreateEditComponent } from '../components/employees/staff/teaching-staff/teaching-staff-create-edit/teaching-staff-create-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDateModule } from '../components/shared/custom-date/custom-date.module';
import { SharedModule } from './shared.module';
import { EmployeeAttendenceCreateEditComponent } from '../components/employees/employee-attendence/employee-attendence-create-edit/employee-attendence-create-edit.component';
import { EmployeeAttendenceViewComponent } from '../components/employees/employee-attendence/employee-attendence-view/employee-attendence-view.component';

const routes: Routes = [

  // Employee
  { path: "list", component: EmployeeListComponent },
  { path: ":empId/view", component: EmployeeViewComponent },
  { path: "create", component: EmployeeCreateEditComponent },
  { path: ":empId/edit", component: EmployeeCreateEditComponent },

  // Attendence
  { path: "attendences", component: EmployeeAttendenceListComponent },
  { path: "attendences/:empAttdId/view", component: EmployeeAttendenceListComponent },
  { path: "attendence-create", component: EmployeeAttendenceListComponent },
  { path: "attendences/:empAttdId/edit", component: EmployeeAttendenceListComponent },

  // Salary
  { path: "salaries", component: SalaryListComponent },
  { path: "salaries/:salId/view", component: SalaryViewComponent },
  { path: "salary-create", component: SalaryCreateEditComponent },
  { path: "salaries/:salId/edit", component: SalaryCreateEditComponent },

  // Salary payment
  { path: "pay-salaries", component: SalaryPaymentListComponent },
  { path: "pay-salaries/:paySalId/view", component: SalaryPaymentViewComponent },
  { path: "pay-salary-create", component: SalaryPaymentCreateEditComponent },
  { path: "pay-salaries/:paySalId/edit", component: SalaryPaymentCreateEditComponent },

  // Teaching staff
  { path: "teaching-staffs", component: TeachingStaffListComponent },
  { path: ":teachstaffid/teaching-staff-view", component: TeachingStaffViewComponent },
  { path: "teaching-staff-create", component: TeachingStaffCreateEditComponent },
  { path: ":teachstaffid/teaching-staff-edit", component: TeachingStaffCreateEditComponent },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CustomDateModule,
    SharedModule
  ],
  declarations: [
    EmployeeListComponent,
    EmployeeViewComponent,
    EmployeeCreateEditComponent,
    EmployeeAttendenceCreateEditComponent,
    EmployeeAttendenceViewComponent,
    EmployeeAttendenceListComponent,
    SalaryListComponent,
    SalaryViewComponent,
    SalaryCreateEditComponent,
    SalaryPaymentListComponent,
    SalaryPaymentViewComponent,
    SalaryPaymentCreateEditComponent,
    TeachingStaffListComponent,
    TeachingStaffViewComponent,
    TeachingStaffCreateEditComponent,
  ],
  providers: [],
  entryComponents: []

})
export class EmployeesModule { }

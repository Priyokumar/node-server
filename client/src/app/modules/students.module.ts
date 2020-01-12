import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from '../components/students/student/student-list/student-list.component';
import { StudentViewComponent } from '../components/students/student/student-view/student-view.component';
import { StudentCreateEditComponent } from '../components/students/student/student-create-edit/student-create-edit.component';
import { AdmissionFeeListComponent } from '../components/students/admission-fee/admission-fee-list/admission-fee-list.component';
import { AdmissionFeeViewComponent } from '../components/students/admission-fee/admission-fee-view/admission-fee-view.component';
import { AdmissionFeeCreateEditComponent } from '../components/students/admission-fee/admission-fee-create-edit/admission-fee-create-edit.component';
import { StudentAttendenceListComponent } from '../components/students/student-attendence/student-attendence-list/student-attendence-list.component';
import { StudentAttendenceViewComponent } from '../components/students/student-attendence/student-attendence-view/student-attendence-view.component';
import { StudentAttendenceCreateEditComponent } from '../components/students/student-attendence/student-attendence-create-edit/student-attendence-create-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDateModule } from '../components/shared/custom-date/custom-date.module';
import { StudentAttendenceComponent } from '../components/students/student-attendence/student-attendence.component';
import { SearchStudentDialogComponent } from '../components/students/search-student-dialog/search-student-dialog.component';

const routes: Routes = [

  // Student 
  { path: "list", component: StudentListComponent },
  { path: ":studId/view", component: StudentViewComponent },
  { path: "create", component: StudentCreateEditComponent },
  { path: ":studId/edit", component: StudentCreateEditComponent },

  // Admission Fee 
  { path: "admissions", component: AdmissionFeeListComponent },
  { path: ":admId/admission-view", component: AdmissionFeeViewComponent },
  { path: "admission-create", component: AdmissionFeeCreateEditComponent },
  { path: ":admId/admission-edit", component: AdmissionFeeCreateEditComponent },


  // Student Attendence
  { path: "attendences", component: StudentAttendenceListComponent },
  { path: ":studattdid/attendence-view", component: StudentAttendenceViewComponent },
  { path: "attendence-create", component: StudentAttendenceCreateEditComponent },
  { path: ":studattdid/attendence-edit", component: StudentAttendenceCreateEditComponent },

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

    StudentAttendenceComponent,
    AdmissionFeeListComponent,
    AdmissionFeeViewComponent,
    AdmissionFeeCreateEditComponent,
    StudentListComponent,
    StudentViewComponent,
    StudentCreateEditComponent,
    StudentAttendenceListComponent,
    StudentAttendenceViewComponent,
    StudentAttendenceCreateEditComponent,
    SearchStudentDialogComponent

  ],
  entryComponents: [
    SearchStudentDialogComponent
  ]
})
export class StudentsModule { }

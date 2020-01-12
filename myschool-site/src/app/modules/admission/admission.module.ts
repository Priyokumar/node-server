import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmissionComponent } from './admission.component';
import { Routes, RouterModule } from '@angular/router';
import { MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdmissionEnquiryDialogModule } from '../admission-enquiry-dialog/admission-enquiry-dialog.module';

const routes: Routes = [
  { path: "", component: AdmissionComponent }
]

@NgModule({
  declarations: [AdmissionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatToolbarModule,
    AdmissionEnquiryDialogModule,
    MatDialogModule
  ]
})
export class AdmissionModule { }

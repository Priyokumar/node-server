import { Routes, RouterModule } from '@angular/router';
import { AdmissionfeeStructureListComponent } from '../components/maintenance/admission-fee-structure/admissionfee-structure-list/admissionfee-structure-list.component';
import { AdmissionfeeStructureViewComponent } from '../components/maintenance/admission-fee-structure/admissionfee-structure-view/admissionfee-structure-view.component';
import { AdmissionfeeStructureCreateEditComponent } from '../components/maintenance/admission-fee-structure/admissionfee-structure-create-edit/admissionfee-structure-create-edit.component';
import { ClassListComponent } from '../components/maintenance/class/class-list/class-list.component';
import { ClassViewComponent } from '../components/maintenance/class/class-view/class-view.component';
import { ClassCreateEditComponent } from '../components/maintenance/class/class-create-edit/class-create-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDateModule } from '../components/shared/custom-date/custom-date.module';
import { AdmissionFeeStructureDialogComponent } from '../components/maintenance/admission-fee-structure/admission-fee-structure-dialog/admission-fee-structure-dialog.component';

const routes: Routes = [

  // Admission fee
  { path: "admission-fees", component: AdmissionfeeStructureListComponent },
  { path: "admission-fees/:admfeeId/view", component: AdmissionfeeStructureViewComponent },
  { path: "admission-fee-create", component: AdmissionfeeStructureCreateEditComponent },
  { path: "admission-fees/:admfeeId/edit", component: AdmissionfeeStructureCreateEditComponent },

  // Class
  { path: "classes", component: ClassListComponent },
  { path: ":clsid/class-view", component: ClassViewComponent },
  { path: "class-create", component: ClassCreateEditComponent },
  { path: ":clsid/income-edit", component: ClassCreateEditComponent },

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
    ClassListComponent,
    ClassViewComponent,
    ClassCreateEditComponent,
    AdmissionfeeStructureListComponent,
    AdmissionfeeStructureViewComponent,
    AdmissionfeeStructureCreateEditComponent,
    AdmissionFeeStructureDialogComponent,
  ],
  entryComponents: [AdmissionFeeStructureDialogComponent]
})
export class MaintenanceModule { }

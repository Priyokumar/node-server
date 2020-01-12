import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", loadChildren: "./modules/home/home.module#HomeModule" },
  { path: "admission", loadChildren: "./modules/admission/admission.module#AdmissionModule" },
  { path: "academic", loadChildren: "./modules/academy/academy.module#AcademyModule" },
  { path: "contact-us", loadChildren: "./modules/contact-us/contact-us.module#ContactUsModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

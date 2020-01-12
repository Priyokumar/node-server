import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/user/login/login.component';
import { ForgotPasswordComponent } from '../components/user/forgot-password/forgot-password.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [

  { path: "", component: LoginComponent },
  { path: "forget-password", component: ForgotPasswordComponent }

]

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }

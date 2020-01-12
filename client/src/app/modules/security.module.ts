import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from '../components/user/change-password/change-password.component';
import { UserAuditComponent } from '../components/user/user-audit/user-audit.component';
import { UserListComponent } from '../components/user/user/user-list/user-list.component';
import { UserViewComponent } from '../components/user/user/user-view/user-view.component';
import { UserCreateEditComponent } from '../components/user/user/user-create-edit/user-create-edit.component';
import { RoleListComponent } from '../components/user/role/role-list/role-list.component';
import { RoleViewComponent } from '../components/user/role/role-view/role-view.component';
import { RoleCreateEditComponent } from '../components/user/role/role-create-edit/role-create-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDateModule } from '../components/shared/custom-date/custom-date.module';
import { MenuDialogComponent } from '../components/user/role/menu-dialog/menu-dialog.component';
import { MenuViewDialogComponent } from '../components/user/role/menu-view-dialog/menu-view-dialog.component';


const routes: Routes = [

  // Change password
  { path: "change-password", component: ChangePasswordComponent },

  // User Audit
  { path: "user-audit", component: UserAuditComponent },

  // User 
  { path: "users", component: UserListComponent },
  { path: "users/:uid/view", component: UserViewComponent },
  { path: "user-create", component: UserCreateEditComponent },
  { path: "users/:uid/edit", component: UserCreateEditComponent },

  // Role 
  { path: "roles", component: RoleListComponent },
  { path: "roles/:roleId/view", component: RoleViewComponent },
  { path: "role-create", component: RoleCreateEditComponent },
  { path: "roles/:roleId/edit", component: RoleCreateEditComponent },

]

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

    UserAuditComponent,
    ChangePasswordComponent,
    UserListComponent,
    UserViewComponent,
    UserCreateEditComponent,
    RoleCreateEditComponent,
    RoleListComponent,
    RoleViewComponent,
    MenuDialogComponent,
    MenuViewDialogComponent,

  ],
  entryComponents: [
    MenuDialogComponent,
    MenuViewDialogComponent
  ]
})
export class SecurityModule { }

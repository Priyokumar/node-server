import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatIconModule, MatMenuModule, MatButtonModule } from "@angular/material"
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [HeaderComponent], 
  imports: [
    CommonModule, 
    MatIconModule, 
    MatMenuModule, 
    RouterModule, 
    FlexLayoutModule,
    MatButtonModule 
  ], exports: [HeaderComponent] 
})
export class HeaderModule { }

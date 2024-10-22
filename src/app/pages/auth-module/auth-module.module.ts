import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModuleRoutingModule } from './auth-module-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthModuleRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModuleModule { }

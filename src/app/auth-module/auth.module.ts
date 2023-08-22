import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginSketchComponent } from './login/login-sketch/login-sketch.component';
import { LoginComponent } from './login/login/login.component';
import { AccountConfirmationComponent } from './login/account-confirmation/account-confirmation.component';
import { PasswordForgotComponent } from './login/password-forgot/password-forgot.component';
import {SharedModule} from "../shared-module/shared.module";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    RegisterComponent,
    LoginSketchComponent,
    LoginComponent,
    AccountConfirmationComponent,
    PasswordForgotComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class AuthModule { }

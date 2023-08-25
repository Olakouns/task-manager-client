import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login/login.component";
import {AccountConfirmationComponent} from "./login/account-confirmation/account-confirmation.component";
import {RegisterComponent} from "./register/register.component";
import {PasswordForgotComponent} from "./login/password-forgot/password-forgot.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'account-confirmation', component: AccountConfirmationComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'password-forgot', component: PasswordForgotComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}

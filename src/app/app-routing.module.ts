import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth-module/auth.module').then(m => m.AuthModule)},
  {
    path: '',
    loadChildren: () => import('./tasks-module/tasks.module').then(m => m.TasksModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

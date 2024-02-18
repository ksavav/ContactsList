import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterScreenComponent } from './login/register-screen/register-screen.component';
import { LoginScreenComponent } from './login/login-screen/login-screen.component';
import { UsersListComponent } from './user/users-list/users-list.component';

const routes: Routes = [
  {path: '', component: UsersListComponent},
  {path: 'register', component: RegisterScreenComponent},
  {path: 'login', component: LoginScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

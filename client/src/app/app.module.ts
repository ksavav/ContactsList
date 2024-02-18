import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { NavComponent } from './nav/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginScreenComponent } from './login/login-screen/login-screen.component';
import { RegisterScreenComponent } from './login/register-screen/register-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    NavComponent,
    LoginScreenComponent,
    RegisterScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

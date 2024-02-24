import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { NavComponent } from './nav/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginScreenComponent } from './login/login-screen/login-screen.component';
import { RegisterScreenComponent } from './login/register-screen/register-screen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AddContactComponent } from './user/add-contact/add-contact.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddContactDialogComponent } from './user/add-contact-dialog/add-contact-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserDetailsDialogComponent } from './user/user-details-dialog/user-details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    NavComponent,
    LoginScreenComponent,
    RegisterScreenComponent,
    AddContactComponent,
    AddContactDialogComponent,
    UserDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatDialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

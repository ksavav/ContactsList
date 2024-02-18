import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent {

  loginData: any = {}

  constructor(public accountService: AccountService, private router: Router) {}

  login() {
    this.accountService.login(this.loginData).subscribe({
      next: _ => this.router.navigateByUrl('/')
    })
  }

}

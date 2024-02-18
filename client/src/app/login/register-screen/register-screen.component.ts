import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.css']
})
export class RegisterScreenComponent {

  registerData: any = {}

  constructor(public accountService: AccountService, private router: Router) {}

  register() {
    this.accountService.login(this.registerData).subscribe({
      next: _ => this.router.navigateByUrl('/')
    })
  }

}

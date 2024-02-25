import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent {

  loginData: any = {}
  loginForm: FormControl | any

  constructor(public accountService: AccountService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    })  
  }

  login() {
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
         next: _ => this.router.navigateByUrl('/')
      })
    }
  }
}

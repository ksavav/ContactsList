import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent {

  loginData: any = {}
  loginForm: FormControl | any

  constructor(public accountService: AccountService, private router: Router, private fb: FormBuilder, private toastr: ToastrService) {}

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
         next: _ => {
          this.router.navigateByUrl('/')
          this.toastr.success("Logged in successfuly!")
        },
        error: _ => {
          this.toastr.error("Wrong email or password!")
        }
      })
    }
  }
}

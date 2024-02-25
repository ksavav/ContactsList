import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.css']
})
export class RegisterScreenComponent {

  registerForm: FormControl | any

  constructor(public accountService: AccountService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: new FormControl('', [
        Validators.required
      ]),
      lastname: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      phone: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      cpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
    })  
  }

  getValuesFromForm() {
    if(this.registerForm.valid) {
      if(this.registerForm.value.passwordForm == this.registerForm.value.cpasswordForm) {
        console.log(this.registerForm.value)
        this.register(this.registerForm.value)
      }
    }
  }

  register(values: any) {
    this.accountService.register(this.registerForm.value).subscribe({
      next: _ => this.router.navigateByUrl('/')
    })
  }

}

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
      nameForm: new FormControl('', [
        Validators.required
      ]),
      surnameForm: new FormControl('', [
        Validators.required
      ]),
      emailForm: new FormControl('', [
        Validators.required
      ]),
      phoneForm: new FormControl('', [
        Validators.required
      ]),
      roleForm: new FormControl('', [
        Validators.required
      ]),
      specificRoleForm: new FormControl('', [
        Validators.required
      ]),
      passwordForm: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      cpasswordForm: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
    })  
  }

  getValuesFromForm() {
    if(this.registerForm.valid) {
      if(this.registerForm.value.passwordForm == this.registerForm.value.cpasswordForm) {
        const values = {...this.registerForm.value}
        console.log(values)
        this.register(values)
      }
    }
  }

  register(values: any) {
    this.accountService.register(values).subscribe({
      next: _ => this.router.navigateByUrl('/')
    })
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
  styleUrls: ['./add-contact-dialog.component.css']
})
export class AddContactDialogComponent {
  Roles: any = ['Business', 'Other'];
  BusinessRoles: any = ['CEO', 'Client', 'Team Leader', 'Developer', 'Tester', 'Worker']
  newContactForm: FormControl | any
  selected: any = null
  constructor (private fb: FormBuilder) {}

  ngOnInit(): void {
    this.newContactForm = this.fb.group({
      name: new FormControl('', [
        Validators.required
      ]),
      lastname: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      role: new FormControl('', [
        Validators.required
      ]),
      specificRole: new FormControl('', [
        Validators.required
      ]),
      phone: new FormControl('', [
        Validators.required
      ])
    })
  }

  changeRole(e: any) {
    this.newContactForm.role?.setValue(e.target.value, {
      onlySelf: true,
    });
    this.selected = e.target.value
    console.log(e.target.value)
  }

  addContact() {

  }
}

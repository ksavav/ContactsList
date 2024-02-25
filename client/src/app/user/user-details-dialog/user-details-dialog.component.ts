import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-details-dialog',
  templateUrl: './user-details-dialog.component.html',
  styleUrls: ['./user-details-dialog.component.css']
})
export class UserDetailsDialogComponent {
  editMode: boolean | undefined = false
  contact: any
  editUserForm: FormControl | any
  selected: any
  Roles: any = ['Business', 'Other'];
  BusinessRoles: any = ['CEO', 'Client', 'Team Leader', 'Developer', 'Tester', 'Worker']

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editUserForm = this.fb.group({
      name: new FormControl(this.contact.name, [
        Validators.required
      ]),
      lastname: new FormControl(this.contact.lastname, [
        Validators.required
      ]),
      newEmail: new FormControl(this.contact.email, [
        Validators.required
      ]),
      email: new FormControl(this.contact.email, [
        Validators.required
      ]),
      phone: new FormControl(this.contact.phone, [
        Validators.required
      ]),
      role: new FormControl(this.contact.role, [
        Validators.required
      ]),
      specificRole: new FormControl(this.contact.specificRole, [
        Validators.required
      ])
    })

    this.selected = this.contact.role
  }

  changeRole(e: any) {
    this.editUserForm.role?.setValue(e.target.value, {
      onlySelf: true,
    });

    this.selected = e.target.value
  }

  changeEditMode() {
    this.editMode = !this.editMode
  }
}

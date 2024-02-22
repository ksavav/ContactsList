import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {

  newContactForm: FormControl | any

  constructor (private fb: FormBuilder, public modalRef: MdbModalRef<AddContactComponent>) {}

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

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }
}

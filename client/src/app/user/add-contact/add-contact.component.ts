import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddContactDialogComponent } from '../add-contact-dialog/add-contact-dialog.component';
import { CommunicationService } from 'src/app/services/communication.service';
import { UserDetailsDialogComponent } from '../user-details-dialog/user-details-dialog.component';

// actually its not add contact component, but contact modals middleware

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {
  @Output() ItemEvent = new EventEmitter<any>()
  newContact: any

  constructor(public dialog: MatDialog, private communicationService: CommunicationService) {}

  ngOnInit(): void {
    this.communicationService.contactSelected$.subscribe(contact => {
      this.viewContact(contact);
    });
  }

  addContact() {
    const dialogRef = this.dialog.open(AddContactDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.newContact = result
      this.ItemEvent.emit(this.newContact)
    });
  }

  viewContact(value: any) {
    if (value != null) {
      const dialogRef = this.dialog.open(UserDetailsDialogComponent)
      dialogRef.componentInstance.contact = value

      dialogRef.afterClosed().subscribe(result => {
      //this.newContact = result
      //this.ItemEvent.emit(this.newContact)
    });
    }
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ContactService } from 'src/app/services/contact.service';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  contacts: Contact[] = [];
  user: User | undefined

  @Output() myEvent = new EventEmitter()

  constructor(private contactService: ContactService, private accountService: AccountService, private communicationService: CommunicationService) {}
  
  ngOnInit(): void {
    this.getAllContacts()
    this.getUserInformations()
  }

  getAllContacts(): void {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  getUserInformations() {
    var tempUser
    this.accountService.currentUser$.subscribe({
      next(value) {
        if (value != null) {
          tempUser = value
        }
      },
    })

    this.user = tempUser
  }

  addNewContact(value: any) {
    this.contactService.addContact(value).subscribe(response => {
    })

    this.getAllContacts()
  }

  viewContact(value: any) {
    this.communicationService.selectContact(value)
  }
}

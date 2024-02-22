import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Contact } from 'src/app/models/contact';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ContactService } from 'src/app/services/contact.service';
import { AddContactComponent } from '../add-contact/add-contact.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  // modalRef: MdbModalRef<AddContactComponent> | null = null;
  contacts: Contact[] = [];
  user: User | undefined

  constructor(private contactService: ContactService, private accountService: AccountService) {}
  
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

  addNewContact() {
    //this.modalRef = this.modalService.open(AddContactComponent);
  }
}

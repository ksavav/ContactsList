import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ContactService } from 'src/app/services/contact.service';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { CommunicationService } from 'src/app/services/communication.service';
import { EditService } from 'src/app/services/edit.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  contacts: Contact[] = [];
  user: User | undefined

  @Output() myEvent = new EventEmitter()

  constructor(private contactService: ContactService, private accountService: AccountService,
    private communicationService: CommunicationService, private editService: EditService, 
    private toastr: ToastrService) {}
  
  ngOnInit(): void {
    this.getAllContacts()
    this.getUserInformations()

    this.communicationService.contactEdited$.subscribe(contact => {
      this.editContact(contact)
    })
  }

  getAllContacts(): void {
    this.contactService.getContacts().subscribe({
      next: response => {
        this.contacts = response
        this.toastr.success("All contacts have been loaded", "Success!")
      },
      error: err => {
        this.toastr.error("Could not load the contacts!", "Something went wrong")
      }
    });
  }

  getAllUserContacts(): void {
    this.contactService.getUserContacts().subscribe({
      next: response => {
        this.contacts = response
        this.toastr.success("Your contacts have been loaded", "Success!")
      },
      error: err => {
        this.toastr.error("Could not load the contacts!", "Something went wrong")
      }
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
    this.contactService.addContact(value).subscribe({
      next: _ => this.getAllContacts(),
      error: _ => this.getAllContacts()
    })
  }

  viewContact(value: any) {
    this.communicationService.selectContact(value)
  }

  editContact(value: any) {
    this.editService.editContact(value).subscribe({
      next: response =>{ 
        this.getAllContacts()
        this.toastr.success(response, "Success!")
        console.log(response)
      },
      error: err => {
        this.getAllContacts()
        this.toastr.error(err.error, "Something went wrong")
        console.error(err);
      }
    })
  }
}

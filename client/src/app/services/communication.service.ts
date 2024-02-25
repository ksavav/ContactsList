import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private contactSelectedSubject = new Subject<any>();
  private editedContactSubject = new Subject<any>();

  contactSelected$ = this.contactSelectedSubject.asObservable();
  contactEdited$ = this.editedContactSubject.asObservable();

  constructor() { }

  selectContact(contact: any) {
    this.contactSelectedSubject.next(contact);
  }

  returnEditedContact(contact: any) {
    this.editedContactSubject.next(contact)
  }
}

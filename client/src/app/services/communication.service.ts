import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private contactSelectedSubject = new Subject<any>();
  contactSelected$ = this.contactSelectedSubject.asObservable();

  constructor() { }

  selectContact(contact: any) {
    this.contactSelectedSubject.next(contact);
  }
}

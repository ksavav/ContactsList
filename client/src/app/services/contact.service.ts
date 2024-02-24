import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url = environment.url

  constructor(private http: HttpClient) { }

  getContactById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/contacts/${id}`)
  }

  getContactByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.url}/contacts/email/${email}`)
  }

  getContacts(): Observable<any> {
    return this.http.get<any>(`${this.url}/contacts`)
  }

  addContact(newContact: any) {
    console.log(newContact)
    return this.http.post(this.url + "/contacts/add-contact", newContact)
  }
}

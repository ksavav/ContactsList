import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  private url = environment.url

  constructor(private http: HttpClient) { }

  editContact(editedContact: any) {
    return this.http.put(this.url + "/edit", editedContact)
  }
}

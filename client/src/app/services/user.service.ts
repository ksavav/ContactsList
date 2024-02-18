import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.url

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/users/${id}`)
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.url}/users/email/${email}`)
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.url}/users`)
  }
}

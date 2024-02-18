import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url = environment.url

  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(loginUser: any) {
    return this.http.post<any>(this.url + "account/login", loginUser).pipe(
      map((response: User) => {
        let user = response
        if(user) {
          this.currentUserSource.next(user)
        }
      })
    )
  }

  register(newUser: any) {
    return this.http.post<any>(this.url + "account/register", newUser).pipe(
      map(user => {
        if(user) {
          this.currentUserSource.next(user)
        }
      })
    )
  }

  logout() {
    this.currentUserSource.next(null);
  }
}

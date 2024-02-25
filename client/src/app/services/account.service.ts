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
    return this.http.post<User>(this.url + "/account/login", loginUser).pipe(
      map((response: User) => {
        let user = response
        if(user) {
          this.setCurrentUser(user)
        }
      })
    )
  }

  register(newUser: any) {
    return this.http.post<User>(this.url + "/account/register", newUser).pipe(
      map(user => {
        if(user) {
          this.setCurrentUser(user)
        }
      })
    )
  }

  setCurrentUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user')
    this.currentUserSource.next(null)
    window.location.reload()
  }
}

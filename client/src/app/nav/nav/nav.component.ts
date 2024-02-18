import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(public accountService: AccountService, private router: Router) {}

  login() {
    this.router.navigateByUrl('/login')
  }

  register() {
    this.router.navigateByUrl('/register')
  }

  logout() {
    this.accountService.logout()
  }
}

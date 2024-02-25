import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  userName: string | undefined
  userLastname: string | undefined

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.getUserInformations();
      });
  }

  getUserInformations() {
    var tempUserName = ""
    var tempUserLastname = ""
    this.accountService.currentUser$.subscribe({
      next(value) {
        if (value != null) {
          tempUserName = value.name
          tempUserLastname = value.lastname
        }
      },
    })

    this.userName = tempUserName
    this.userLastname = tempUserLastname
  }

  login() {
    this.router.navigateByUrl('/login')
  }

  register() {
    this.router.navigateByUrl('/register')
  }

  logout() {
    this.accountService.logout()
    this.toastr.info("Logout")
  }
}

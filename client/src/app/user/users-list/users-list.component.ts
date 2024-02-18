import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  users: User[] = [];


  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}

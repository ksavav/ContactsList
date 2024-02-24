import { Component } from '@angular/core';

@Component({
  selector: 'app-user-details-dialog',
  templateUrl: './user-details-dialog.component.html',
  styleUrls: ['./user-details-dialog.component.css']
})
export class UserDetailsDialogComponent {
  editMode: boolean | undefined = false
  contact: any

  ngOnInit(): void {
    console.log(this.contact)
  }

  changeEditMode() {
    this.editMode = !this.editMode
  }
}

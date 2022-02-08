import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { User } from '../shared/models';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  user: User
  date_birth: Date

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: User}) { }

  ngOnInit(): void {
    this.user = this.data.user
    this.date_birth = new Date(this.user.date_birth)
  }

}

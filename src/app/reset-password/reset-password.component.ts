import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  email: string = ''
  message: string = 'На указанную почту придет письмо для восстановления пароля'
  error = false
  success = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  resetPassword() {
    this.authService.resetPassword(this.email).subscribe(() => {
      this.message = 'На вашу почту отправлено письмо'
      this.error = false
      this.success = true
    }, err => {
      this.message = 'Произошла ошибка, попробуйте позже'
      this.error = true
      this.success = false
    })
  }

}

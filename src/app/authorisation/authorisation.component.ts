import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { expand } from '../animations/app.animations';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models';
import { SharedService } from '../shared/sharedservice';

@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.scss'],
  animations: [
    expand()
  ]
})
export class AuthorisationComponent implements OnInit {
  authForm: FormGroup
  errMess: string
  token: string
  hide = true

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.authForm = this.fb.group({
      login: [''],
      password: ['']
    })
  }

  onSubmit() {
    this.authService.auth(new User(this.authForm.value['login'], this.authForm.value['password'])).subscribe(
      response => {
        this.token = Object.values(response)[0]
        console.log(this.token)
        localStorage.setItem("token", this.token)
        this.authService.getMe().subscribe(response => {
          localStorage.setItem("username", response.username)
          localStorage.setItem("first_name", response.first_name)
          localStorage.setItem("last_name", response.last_name)
          localStorage.setItem("id", response.id.toString())
          AppComponent.changeMenu(true)
          window.location.href="schedule"
        }, err => console.log(err))
      },
      err => {
        if(err.toString().includes("400")){
          this.errMess = "Неверный логин или пароль"
        } else {
          this.errMess = "Ошибка сервера"
        }
        console.log(this.errMess)
      }
    )
  }

  changed() {
    this.errMess = undefined
  }

}

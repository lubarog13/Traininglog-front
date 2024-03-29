import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { expand } from '../animations/app.animations';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
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

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService, private router: Router) { }

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
          AppComponent.first_name = response.first_name
          AppComponent.surname = response.last_name
          localStorage.setItem("id", response.id.toString())
          localStorage.setItem("is_coach", response.is_coach? "true": "false")
          AppComponent.changeMenu(true)
          if (response.is_coach==true) {
            this.getCoachInfo()
          }
          else this.router.navigate(["/schedule"])
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

  getCoachInfo() {
    this.userService.getCoachForUser(Number.parseInt(localStorage.getItem("id"))).subscribe(response => {
      localStorage.setItem("coach_id", response.Coach.id.toString())
      this.router.navigate(["/schedule"])
    })
  }

  changed() {
    this.errMess = undefined
  }

}

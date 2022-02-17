import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-component',
  templateUrl: './error-component.component.html',
  styleUrls: ['./error-component.component.scss']
})
export class ErrorComponentComponent implements OnInit {

  @Input() err: String

  code: number

  constructor() { }

  ngOnInit(): void {
    if(this.err.includes("50")) {
      this.code = 500
    }
    else if(this.err.includes("Unknown Error")) {
      this.code = 0
    }
    else if(this.err.includes("400")){
      this.code = 400
    }
    else if (this.err.includes("404")) {
      this.code = 404
    }
    else if (this.err.includes("401")) {
      this.logout()
    }
    else {
      this.code = -1
    }
  }

  clearLocalStorage() {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("first_name")
    localStorage.removeItem("last_name")
    localStorage.removeItem("id")
    localStorage.removeItem("is_coach")
    localStorage.removeItem("coach_id")
  }

  logout() {
      this.clearLocalStorage()
      window.location.href = "/auth"
  }



}

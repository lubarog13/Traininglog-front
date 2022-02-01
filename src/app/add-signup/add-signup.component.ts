import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClubsService } from '../services/clubs.service';
import { MessagesService } from '../services/messages.service';
import { CustomValidators } from '../shared/custom-validators';
import { Club, SignUpForCreate, UserSearch } from '../shared/models';

@Component({
  selector: 'app-add-signup',
  templateUrl: './add-signup.component.html',
  styleUrls: ['./add-signup.component.scss']
})
export class AddSignupComponent implements OnInit {

  signUpForm: FormGroup
  @Input('club') club1: Club
  @Output() windowClosed = new EventEmitter()
  @Output() created = new EventEmitter()
  errMsg: string


  formErrors = {
    'club':'',
    'username': '',
    'start_date': '',
    'end_date': ''
  }

  validationMessages = {
    'club': {
      'required': "Секция должна быть выбрана"
    },
    'username': {
      'required': 'Введите имя пользователя'
    },
    'start_date': {
      'required': "Поле должно быть заполнено",
      'TooSmall': "Дата должна быть меньше текущей"
    },
    'end_date': {
      'required': "Поле должно быть заполнено",
      'TooSmall': "Дата должна быть меньше текущей",
      'TooBig': "Дата должна быть меньше начальной"
    }
  }

  constructor(private fb: FormBuilder, private clubService: ClubsService, private messageService: MessagesService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm () {
    this.signUpForm = this.fb.group({
      club: [this.club1.name + " " + this.club1.group, [Validators.required]],
      username: [null, Validators.required],
      start_date: [null, Validators.required],
      end_date: [null, Validators.required]
    }, {
      validators: [CustomValidators.dateValidator]
    })
    this.signUpForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
      this.onValueChanged()
  }
  onValueChanged(data?: any) {
    if (!this.signUpForm) { return; }
    const form = this.signUpForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.messageService.searchUsers(new UserSearch(this.signUpForm.value['username'])).subscribe(response=> {
      this.errMsg = undefined
      var signup: SignUpForCreate
      signup =  {club: this.club1.id, user: response.Users[0].id, start_date: formatDate(this.signUpForm.value['start_date'], "yyyy-MM-dd", "en-US"), end_date: formatDate(this.signUpForm.value['end_date'], "yyyy-MM-dd", "en-US")}
      this.clubService.createSignup(signup).subscribe(response=> {
        this.created.emit("created")
      }, err => {
        console.log(err)
      })
    }, err => {
      this.errMsg = "Пользователь не найден"
    })

  }
}

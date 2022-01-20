import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { expand } from '../animations/app.animations';
import { AnswerDialogComponent } from '../answer-dialog/answer-dialog.component';
import { AuthService } from '../services/auth.service';
import { CustomValidators } from '../shared/custom-validators';
import { User } from '../shared/models';
import { SubmitDialogComponent } from '../submit-dialog/submit-dialog.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  animations: [
    expand()
  ]
})
export class EditProfileComponent implements OnInit {

  
  editUserForm: FormGroup 
  hide = true
  user: User
  maxDate = new Date()
  errMsg: string;
  formErrors = {
    'first_name': '',
    'last_name': '',
    'second_name': '',
    'email': '',
    'date_birth': '',
    'sex': ''
  }

  validationMessages = {
    'first_name': {
      'required': 'Имя не должно быть пустым',
      'minlength': 'Имя должно иметь минимум два символа', 
      'maxlength': 'Имя должно иметь меньше 150 символов'
    }, 
    'last_name': {
      'required': 'Фамилия не должна быть пустой',
      'minlength': 'Фамилия должна иметь минимум два символа', 
      'maxlength': 'Фамилия должна иметь меньше 150 символов'
    }, 
    'second_name': {
      'minlength': 'Отчество должно иметь минимум два символа'
    }, 
    'email': {
      'required': 'Email обязателен',
      'email': 'Неверный формат email'
    }, 
    'date_birth': {
      'required': 'Поле обязательно для заполнения'
    }, 
    'sex': {
      'required': 'Поле обязательно для заполнения'
    }
  }  

  constructor(private fb: FormBuilder, private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.createForm()
    this.reload()
  }

  reload() {
    this.authService.getMe().subscribe(response => {
      this.user = response
      this.editUserForm.setValue({first_name: response.first_name, last_name: response.last_name, second_name: response.second_name, email: response.email, date_birth: new Date(response.date_birth), sex: response.sex})
    })
  }

  createForm() {
    this.editUserForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      second_name: ['', [Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      date_birth: ['', [Validators.required]],
      sex: ['', [Validators.required]]
    },
    );
    this.editUserForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }
  onSubmit() {
    console.log(this.editUserForm.value)
    var user: User = this.editUserForm.value
    user.date_birth = formatDate(user.date_birth, "yyyy-MM-dd", "en-US")
    user.is_coach = this.user.is_coach
    user.id = this.user.id
    this.authService.editMe(user).subscribe(response => {
      console.log(response)
      this.errMsg = undefined
      this.reload()
      this.errMsg = "Успешно обновлено"
    }, err => {
      console.log(err)
      this.errMsg = "Ошибка обновления"
    })
  }

  onValueChanged(data?: any) {
    if (!this.editUserForm) { return; }
    const form = this.editUserForm;
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

}

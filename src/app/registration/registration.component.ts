import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CustomValidators } from '../shared/custom-validators';
import { User } from '../shared/models';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup 
  hide = true

  formErrors = {
    'first_name': '',
    'last_name': '',
    'second_name': '',
    'email': '',
    'date_birth': '',
    'sex': '',
    'username': '',
    'password': '',
    're_password': ''
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
    }, 
    'username': {
      'required': ' Логин не должен быть пустым',
      'minlength': 'Логин должен иметь минимум восемь символов', 
      'maxlength': 'Логин должнен иметь меньше 150 символов'
    },
    'password': {
      'required': 'Пароль не должен быть пустым',
      'minlength': 'Пароль должен иметь минимум восемь символов', 
      'maxlength': 'Пароль должнен иметь меньше 128 символов',
      'hasNumber': 'Пароль должен содержать цифры',
      'hasCapitalCase': 'Пароль должен иметь заглавные буквы',
      'hasSmallCase': 'Пароль должен иметь прописные буквы',
    },
    're_password': {
      'required': 'Повторите пароль',
      'NoPassswordMatch': 'Пароли не совпадают'
    }
  }  

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.registrationForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      second_name: ['', [Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      date_birth: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(150)]],
      password: [null, Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-ZА-Я]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        CustomValidators.patternValidator(/[a-zа-я]/, { hasSmallCase: true }),
        // 6. Has a minimum length of 8 characters
        Validators.minLength(8),
        Validators.maxLength(128)
      ]
        )
     ],
     re_password: [null, Validators.required]
    },
    {
      // check whether our password and confirm password match
      validator: CustomValidators.passwordMatchValidator
   }
    );
    this.registrationForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }
  onSubmit() {
    console.log(this.registrationForm.value)
    var user: User = this.registrationForm.value
    user.date_birth = formatDate(user.date_birth, "yyyy-MM-dd", "en-US")
    console.log(user)
    user.is_coach = false
    this.authService.registration(user).subscribe(response => console.log(response), err => console.log(err))
  }

  onValueChanged(data?: any) {
    if (!this.registrationForm) { return; }
    const form = this.registrationForm;
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

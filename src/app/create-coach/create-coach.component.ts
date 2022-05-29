import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-coach',
  templateUrl: './create-coach.component.html',
  styleUrls: ['./create-coach.component.scss']
})
export class CreateCoachComponent implements OnInit {
  coachForm: FormGroup

  @Output() windowClosed = new EventEmitter()
  @Output() created = new EventEmitter()

  formErrors = {
    'username': '',
    'post': '',
    'image': ''
  }
  validationMessages = {
    'username': {
      'required': 'Введите логин пользователя',
    },
    'post': {
      'required': 'Введите должность',
      'maxlength': 'Должность должна быть короче 75 символов'
    },
    'image': {
      'required': 'Добавьте изображение'
    }

  }

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
      this.createForm()
  }

  createForm() {
    this.coachForm = this.fb.group({
      username: ["", [Validators.required]],
      post: ["", [Validators.required, Validators.maxLength(75)]],
      image: [null, Validators.required]
    })
    this.coachForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
      this.onValueChanged()
  }

  onValueChanged(data?: any) {
    if (!this.coachForm) { return; }
    const form = this.coachForm;
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
  onSubmit(){
    this.userService.createCoach(this.coachForm.value).subscribe(res => {
      this.userService.postCoachFile(this.coachForm.value['image']).subscribe(res => {
        this.created.emit("created")
      }, err => console.log(err))
    }, err => console.log(err))
  }


}

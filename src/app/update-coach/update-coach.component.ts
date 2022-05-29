import { Component, EventEmitter, OnInit, Output, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Coach } from '../shared/models';

@Component({
  selector: 'app-update-coach',
  templateUrl: './update-coach.component.html',
  styleUrls: ['./update-coach.component.scss']
})
export class UpdateCoachComponent implements OnInit {

  coachForm: FormGroup

  @Output() windowClosed = new EventEmitter()
  @Output() created = new EventEmitter()
  @Input() coach: Coach
  time = new Date().getTime()

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

  constructor(private fb: FormBuilder, private userService: UserService, @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
      this.createForm()
  }

  createForm() {
    this.coachForm = this.fb.group({
      username: [this.coach.user.username, [Validators.required]],
      post: [this.coach.post, [Validators.required, Validators.maxLength(75)]],
      image: [null]
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
    let formVal = this.coachForm.value
    formVal.id = this.coach.id
    formVal.user = this.coach.user.id
    this.userService.updateCoach(formVal, this.coach.id).subscribe(res => {
      if (this.coachForm.value['image']!=null){
      this.userService.postCoachFile(this.coachForm.value['image'], this.coach.id).subscribe(res => {
        this.created.emit("created")
      }, err => console.log(err))
    }
    else {
      this.created.emit("created")
    }
    }, err => console.log(err))
  }



}

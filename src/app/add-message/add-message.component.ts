import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '../services/messages.service';
import { Message, SimpleMessage, UserSearch } from '../shared/models';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.scss']
})
export class AddMessageComponent implements OnInit {

  messageForm: FormGroup
  @Output() messageSent = new EventEmitter()
  @Output() windowClosed = new EventEmitter()
  userErr: string
  formErrors = {
    'username': '',
    'heding': '',
    'message':''
  }

  validationMessages = {
    'username': {
      'required': "Имя пользователя должно быть заполнено"
    },
    'heding': {
      'required': 'Заголовок должен присутствовать',
      'maxlength': 'Заголовок должен быть короче 100 символов'
    },
    'message': {
      'maxlength': 'Сообщение должно быть короче 3000 символов'
    }
  }


  constructor(private messageService: MessagesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
      this.messageForm = this.fb.group({
        username: ['', [Validators.required]],
        heding: ['', [Validators.required, Validators.maxLength(100)]],
        message: ['', Validators.maxLength(3000)]
      })
      this.messageForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.messageForm) { return; }
    const form = this.messageForm;
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
    var message: SimpleMessage = this.messageForm.value
    message.send_time = new Date().toISOString()
    console.log(this.messageForm.value['username'])
    this.messageService.searchUsers(new UserSearch(this.messageForm.value['username'])).subscribe(response => {
        if(response.Users.length>1) {
          this.userErr = "Пользователей с таким именем больше 1"
        } else {
          this.userErr = undefined
          message.sender = Number.parseInt(localStorage.getItem("id"))
          message.recipient = response.Users[0].id
          this.messageService.createMessage(message).subscribe(response=> { this.messageSent.emit('reload')}, err => this.userErr = "Ошибка создания сообщения")
        }
    }, err => {
        this.userErr = "Пользователь с таким именем не найден"
    })
  }

}

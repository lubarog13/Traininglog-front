import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesService } from '../services/messages.service';
import { Club, SimpleMessage, UserSearch } from '../shared/models';

@Component({
  selector: 'app-bid-dialog',
  templateUrl: './bid-dialog.component.html',
  styleUrls: ['./bid-dialog.component.scss']
})
export class BidDialogComponent implements OnInit {

  messageForm: FormGroup

  formErrors = {
    'heding': '',
    'message':''
  }

  validationMessages = {
    'heding': {
      'required': 'Заголовок должен присутствовать',
      'maxlength': 'Заголовок должен быть короче 100 символов'
    },
    'message': {
      'maxlength': 'Сообщение должно быть короче 3000 символов'
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: {club: Club}, private fb: FormBuilder, private messageService: MessagesService, public dialogRef: MatDialogRef<BidDialogComponent>) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.messageForm = this.fb.group({
      heding: ['Заявление о записи на секцию', [Validators.required, Validators.maxLength(100)]],
      message: ['Прошу записать меня на секцию "' + this.data.club.name + '" в группу ' + this.data.club.group, Validators.maxLength(3000)]
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
  this.messageService.searchUsers(new UserSearch("admin")).subscribe(response => {
      message.sender = Number.parseInt(localStorage.getItem("id"))
      message.recipient = response.Users[0].id
     this.messageService.createMessage(message).subscribe(response=> { this.dialogRef.close()}, err => console.log(err))
  })
}

}

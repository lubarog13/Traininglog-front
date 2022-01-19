import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-answer-dialog',
  template: `
    <h2 mat-dialog-title>{{data.title}}</h2>
<mat-dialog-content class="mat-typography">
    <p>{{data.message}}</p>
</mat-dialog-content>
<mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Нет</button>
    <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Да</button>
</mat-dialog-actions>
  `,
  styles: [
  ]
})
export class AnswerDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, message: string}) { }

  ngOnInit(): void {
  }

}

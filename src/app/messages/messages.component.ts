import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormControl } from '@angular/forms';
import { MatGridList } from '@angular/material/grid-list';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '../services/messages.service';
import { Message } from '../shared/models';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, AfterViewInit {
  incoming = true
  active = new FormControl(0)
  messages: Message[]
  @ViewChild('gridList') gridList: MatGridList
  @ViewChild('gridTooList') gridTooList: MatGridList
  gridByBreakpoint = {
    xl: 5,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
  } 

  constructor(private route: ActivatedRoute, private router: Router, private messageService: MessagesService, private mediaObserver: MediaObserver) { }
  ngAfterViewInit(): void {
      this.mediaObserver.asObservable().subscribe((change) => {
        console.log(change)
        this.gridList.cols = this.gridByBreakpoint[change[0].mqAlias]
        this.gridTooList.cols=this.gridList.cols
      });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.incoming = (params.incoming=="true")
      this.active.setValue(this.incoming==true ? 0: 1)
      this.getMessages()
    }
    )
  }

  getMessages() {
    if(this.incoming){
      this.messageService.getMessagesForUser().subscribe(response => {
        this.messages=response.Messages
        console.log(this.messages)
        for(let message of this.messages){
          message.send_date = new Date(message.send_time)
        }
      })
    } else {
      this.messageService.getMessagesFromUser().subscribe(response => {
        this.messages=response.Messages
        console.log(this.messages)
        for(let message of this.messages){
          message.send_date = new Date(message.send_time)
        }
      })
    }
  }

  selectedChange() {
    console.log("nav1", this.incoming)
      this.incoming = this.incoming===true? false: true
      console.log("nav", this.incoming)
      this.router.navigate(
        ['.'],
        {
          relativeTo: this.route,
          queryParams: { incoming : this.incoming}
        }
      )
  }

  isDisabled(date: Date): boolean {
    return Math.abs(new Date().getTime() - date.getTime()) / 36e5 >24
  }

}

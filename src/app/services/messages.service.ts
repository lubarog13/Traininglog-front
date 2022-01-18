import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Message } from '../shared/models';
import { MessageResponse } from '../shared/responses';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
    
    getMessagesForUser(): Observable<MessageResponse> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token")
        })
      };

      return this.http.get<MessageResponse>(baseURL + "user/" + localStorage.getItem("id") + "/messages/", httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

    getMessagesFromUser(): Observable<MessageResponse> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token")
        })
      };

      return this.http.get<MessageResponse>(baseURL + "user/" + localStorage.getItem("id") + "/messages/send/", httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Message, SimpleMessage, UserSearch } from '../shared/models';
import { MessageResponse, UserResponse } from '../shared/responses';
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


    createMessage(message: SimpleMessage): Observable<SimpleMessage> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token"),
          'Content-Type': 'application/json'
        })
      };
      return this.http.post<SimpleMessage>(baseURL + "message/create/", message, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

    searchUsers(username: UserSearch): Observable<UserResponse> {
      console.log(username)
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token"),
          'Content-Type': 'application/json'
        })
      };
      return this.http.post<UserResponse>(baseURL + "search/user/", username, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }


    editMessage(message: SimpleMessage): Observable<SimpleMessage> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token"),
          'Content-Type': 'application/json'
        })
      };
      return this.http.put<SimpleMessage>(baseURL + "message/" + message.id + "/update/", message, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    } 


    deleteMessage(id: number) : Observable<Object> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token")
        })
      };
      return this.http.delete(baseURL + "message/" + id + "/delete/", httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

}

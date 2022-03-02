import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { User } from '../shared/models';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }


    auth(user: User): Observable<Object> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.post(baseURL + 'auth/token/login', user, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

    getMe(): Observable<User> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token")
        })
      };
      return this.http.get<User>(baseURL + "auth/users/me/", httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

    registration(user: User): Observable<Object> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.post(baseURL + 'auth/users/', user, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

    editMe(user: User): Observable<User> {
      const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      })
    };
      return this.http.patch<User>(baseURL + "auth/users/me/", user, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }


    logout(): Observable<Object> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token")
        })
      };
      return this.http.post(baseURL + "auth/token/logout", null, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

    resetPassword(email): Observable<Object> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token"),
          'Content-Type': 'application/json'
        })
      };
      const body = {
        email: email
      }
      return this.http.post(baseURL + "auth/users/reset_password/", body, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Club, SignUp } from '../shared/models';
import { SignUpResponse } from '../shared/responses';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    getClubs(): Observable<Club[]> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token")
        })
      };
      return this.http.get<Club[]>(baseURL + 'clubs/', httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

    getSignUpsForUser(user_id: number): Observable<SignUpResponse> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token")
        })
      };
        return this.http.get<SignUpResponse>(baseURL + "user/" + user_id+"/sign_ups/", httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

    deleteSignup(signup_id: number): Observable<Object> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token")
        })
      };
      return this.http.delete(baseURL + "signup/" + signup_id + "/delete/", httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }
}

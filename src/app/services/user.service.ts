import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { UserResponse } from '../shared/responses';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

   getUsersForClub(club_id: number): Observable<UserResponse>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token")
      })
    };
    return this.http.get<UserResponse>(baseURL + "club/" + club_id + "/users/", httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
   }
}

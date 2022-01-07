import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Presence } from '../shared/models';
import { SimplePresenceResponse } from '../shared/responses';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    getPresencesForWorkout(id: number): Observable<SimplePresenceResponse> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token e93210d1dd1160a02feefd0c60d64b817033feb7'
        })
      };
       return this.http.get<SimplePresenceResponse>(baseURL + "workout/" + id + "/presences/", httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
    }

    updatePresence(user_id: number, workout_id: number, presence: Presence): Observable<Response> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token e93210d1dd1160a02feefd0c60d64b817033feb7',
          'Content-Type': 'application/json'
        })
      };
      return this.http.patch<Response>(baseURL + "presence/update/user/"+user_id+"/workout/"+workout_id+"/", presence, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }
}

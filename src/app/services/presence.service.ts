import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Presence, PresenceForCreate } from '../shared/models';
import { PresencesResponse, SimplePresenceResponse } from '../shared/responses';
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
          'Authorization':  'Token ' + localStorage.getItem("token")
        })
      };
       return this.http.get<SimplePresenceResponse>(baseURL + "workout/" + id + "/presences/", httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
    }

    updatePresence(user_id: number, workout_id: number, presence: Presence): Observable<Response> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token"),
          'Content-Type': 'application/json'
        })
      };
      return this.http.patch<Response>(baseURL + "presence/update/user/"+user_id+"/workout/"+workout_id+"/", presence, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

    getPresencesForDay(day: Date): Observable<PresencesResponse> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token")
        })
      };
       return this.http.get<PresencesResponse>(baseURL +  "coach/" + localStorage.getItem("coach_id") + "/presences/" + day.getDate() + "/" + (day.getMonth() + 1) +"/" + day.getFullYear() + "/", httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
    }

    updatePresenceSimple(presence: PresenceForCreate): Observable<Object> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token"),
          'Content-Type': 'application/json'
        })
      };
      return this.http.put<Object> (baseURL + "presence/" + presence.id + "/update/", presence, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }
}

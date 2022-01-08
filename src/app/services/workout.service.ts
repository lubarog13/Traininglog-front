import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Workout } from '../shared/models';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { WorkoutResponse } from '../shared/responses';


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    getWeekWorkouts(id: number): Observable<WorkoutResponse> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token e93210d1dd1160a02feefd0c60d64b817033feb7'
        })
      };
       return this.http.get<WorkoutResponse>(baseURL + "user/" + id + "/week_workouts/", httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
    }

    getMonthWorkouts(user_id: number, month: number, year: number): Observable<WorkoutResponse> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token e93210d1dd1160a02feefd0c60d64b817033feb7'
        })
      };
      return this.http.get<WorkoutResponse>(baseURL + "user/" + user_id + "/workouts/"+ month + "/" + year +"/", httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
    }
}

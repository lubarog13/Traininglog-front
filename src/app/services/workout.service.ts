import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Workout, WorkoutForCreate, Notification } from '../shared/models';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { WorkoutResponse } from '../shared/responses';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    getWeekWorkouts(id: number, is_coach: string): Observable<WorkoutResponse> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token")
        })
      };
      if(is_coach=="true") {
        return this.http.get<WorkoutResponse>(baseURL + "coach/" + id + "/week_workouts/", httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
      }
       else return this.http.get<WorkoutResponse>(baseURL + "user/" + id + "/week_workouts/", httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
    }

    getMonthWorkouts(user_id: number, month: number, year: number): Observable<WorkoutResponse> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token")
        })
      };
      return this.http.get<WorkoutResponse>(baseURL + "user/" + user_id + "/workouts/"+ month + "/" + year +"/", httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
    }

    getMonthWorkoutsForCoach(coach_id: number, month: number, year: number): Observable<WorkoutResponse> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token")
        })
      };
      return this.http.get<WorkoutResponse>(baseURL + "coach/" + coach_id + "/workouts/"+ month + "/" + year +"/", httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
    }

    createWorkout(workout: WorkoutForCreate): Observable<Object> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token"),
          'Content-Type': 'application/json'
        })
      };
      return this.http.post(baseURL + "workout/create/", workout, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }


    editWorkout(workout: WorkoutForCreate, id: number): Observable<Object> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token"),
          'Content-Type': 'application/json'
        })
      };
      return this.http.put(baseURL + "workout/" + id +"/update/", workout, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

    sendNotification(workout: Workout): Observable<Object> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token"),
          'Content-Type': 'application/json'
        })
      };
      const notification: Notification  = {
        club: workout.club.id,
        title: `Тренировка ${formatDate(workout.start_date, "dd.MM", "en-US")} в ${formatDate(workout.start_date, "HH:mm", "en-Us")} отменена`,
        message: `Занятие для группы ${workout.club.group + " " + workout.club.name} отменено `
      }
      return this.http.post(baseURL + "send_message/", notification, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }
    
}

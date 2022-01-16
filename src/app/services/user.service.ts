import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Coach, MonthsAnalysis, TypesAnalysis } from '../shared/models';
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

   getCoaches(): Observable<Coach[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token")
      })
    };
    return this.http.get<Coach[]>(baseURL+"coaches/", httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
   }

   getAnalysisForTypes(): Observable<TypesAnalysis> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token")
      })
    };
    return this.http.get<TypesAnalysis>(baseURL + "user/" + localStorage.getItem("id") + "/analysis/types/", httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
   }

   getAnalysisForMonths(): Observable<MonthsAnalysis> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token")
      })
    };
    return this.http.get<MonthsAnalysis>(baseURL + "user/" + localStorage.getItem("id") + "/analysis/" + (new Date().getMonth()==0? (new Date().getFullYear() -1): new Date().getFullYear()) , httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
   }

   getNotAttendCOuntForMonths(): Observable<MonthsAnalysis> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token")
      })
    };
    return this.http.get<MonthsAnalysis>(baseURL + "user/" + localStorage.getItem("id") + "/analysis/not_attend/" + (new Date().getMonth()==0? (new Date().getFullYear() -1): new Date().getFullYear()) , httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
   }
}

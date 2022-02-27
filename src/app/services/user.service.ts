import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Coach, FCMDevice, GroupAnalysis, Month, MonthsAnalysis, TypesAnalysis, User } from '../shared/models';
import { CoachResponse, DeviceResponse, UserResponse } from '../shared/responses';
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

   getAnalysisForTypes(user_id?: number): Observable<TypesAnalysis> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token")
      })
    };
    if(user_id==null || user_id==undefined){
    return this.http.get<TypesAnalysis>(baseURL + "user/" + localStorage.getItem("id") + "/analysis/types/", httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    } else {
      return this.http.get<TypesAnalysis>(baseURL + "user/" + user_id + "/analysis/types/", httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }
   }

   getAnalysisForMonths(user_id?: number): Observable<MonthsAnalysis> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token")
      })
    };
    if(user_id==null || user_id==undefined){
      return this.http.get<MonthsAnalysis>(baseURL + "user/" + localStorage.getItem("id") + "/analysis/" + (new Date().getMonth()==0? (new Date().getFullYear() -1): new Date().getFullYear()) , httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }  
    else return this.http.get<MonthsAnalysis>(baseURL + "user/" + user_id + "/analysis/" + (new Date().getMonth()==0? (new Date().getFullYear() -1): new Date().getFullYear()) , httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
   }

   getNotAttendCOuntForMonths(user_id?: number): Observable<MonthsAnalysis> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token")
      })
    };
    if(user_id==null || user_id==undefined){
    return this.http.get<MonthsAnalysis>(baseURL + "user/" + localStorage.getItem("id") + "/analysis/not_attend/" + (new Date().getMonth()==0? (new Date().getFullYear() -1): new Date().getFullYear()) , httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    } else {
      return this.http.get<MonthsAnalysis>(baseURL + "user/" + user_id + "/analysis/not_attend/" + (new Date().getMonth()==0? (new Date().getFullYear() -1): new Date().getFullYear()) , httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }
   }


   getCoachForUser(id: number): Observable<CoachResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token")
      })
    };
    return this.http.get<CoachResponse>(baseURL + "coach/user" + id + "/", httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
   }

   getPresenceCountForMonth(month: Month): Observable<GroupAnalysis> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<GroupAnalysis>(baseURL + "coach/" + localStorage.getItem("coach_id") + "/analysis/groups/presences/month/", month, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
   }

   getWorkoutCountForMonth(month: Month): Observable<GroupAnalysis> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<GroupAnalysis>(baseURL + "coach/" + localStorage.getItem("coach_id") + "/analysis/groups/month/", month, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
   }

   getAnalysisForMonth(month: number): Observable<TypesAnalysis>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token")
      })
    };
    return this.http.get<TypesAnalysis>(baseURL + "user/" + localStorage.getItem("id") + "/presences/count/" + month, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
   }

   getPresenceCountForGroups(day: Month): Observable<GroupAnalysis> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<GroupAnalysis>(baseURL + "coach/" + localStorage.getItem("coach_id") + "/analysis/groups/presences/", day, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
   }

   getUser(id: number): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token")
      })
    };
    return this.http.get<User>(baseURL + "user/" + id + "/", httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
   }

   getDevicesForUser(): Observable<DeviceResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token")
      })
    };
    return this.http.get<DeviceResponse>(baseURL + "user/" + localStorage.getItem("id") + "/fcmdevices/", httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
   }

   createDevice(device: FCMDevice): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(baseURL + "fcmdevice/create/", device, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
   }

   updateDevice(device: FCMDevice): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(baseURL + "fcmdevice/" +  device.id +"/update/", device, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
   }
}

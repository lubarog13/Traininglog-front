import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Building, Hall } from '../shared/models';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    getBuildings(): Observable<Building[]> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token")
        })
      };
      return this.http.get<Building[]>(baseURL + "buildings/", httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

    getHalls(): Observable<Hall[]> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token")
        })
      };
      return this.http.get<Hall[]>(baseURL + 'halls/', httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, map } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Building, Hall, HallForCreate } from '../shared/models';
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

    createBuilding(building: Building): Observable<Object> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token"),
          'Content-Type': 'application/json'
        })
      };
      return this.http.post(baseURL+'building/create/', building, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

    postFile(fileToUpload: File, building_id?: number): Observable<Object> {
      const formData: FormData = new FormData();
      formData.append('image_file', fileToUpload, "1");
      if (building_id) {
        formData.append('building_id', building_id.toString())
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token"),
          'Accept': '*/*'
        })
      };
      console.log(formData.get('image_file'))
      return this.http.post(baseURL + 'upload/building/', formData, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

    getBuilding(id: number): Observable<Building> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token")
        })
      };
      return this.http.get<Building>(baseURL + "building/" + id + "/", httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

    updateBuilding(id: number, building: Building): Observable<Object> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token"),
          'Content-Type': 'application/json'
        })
      };
      return this.http.put(baseURL+'building/' + id +  '/update/', building, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

    createHall(hall: HallForCreate): Observable<Object> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token"),
          'Content-Type': 'application/json'
        })
      };
      return this.http.post(baseURL+'hall/create/', hall, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }


    getHall(id: number): Observable<Hall> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token")
        })
      };
      return this.http.get<Hall>(baseURL + "hall/" + id + "/", httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

    updateHall(id: number, hall: HallForCreate): Observable<Object> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token"),
          'Content-Type': 'application/json'
        })
      };
      return this.http.put(baseURL+'hall/' + id +  '/update/', hall, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }

    postHallFile(fileToUpload: File, hall_id?: number ): Observable<Object> {
      const formData: FormData = new FormData();
      formData.append('image_file', fileToUpload, "1");
      if (hall_id) {
        formData.append('hall_id', hall_id.toString())
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Token ' + localStorage.getItem("token"),
          'Accept': '*/*'
        })
      };
      console.log(formData.get('image_file'))
      return this.http.post(baseURL + 'upload/hall/', formData, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
    }
  
}

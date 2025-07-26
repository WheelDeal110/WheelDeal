import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

    private apiUrl = 'https://wheeldeal-001-site1.qtempurl.com/api/Home/';
  
     constructor(private router: Router,private http:HttpClient) {
     
    }

    getBodyType(): Observable<any> {
      return this.http.get(this.apiUrl + 'GetBodyType');
    }

    getBrand(): Observable<any> {
      return this.http.get(this.apiUrl + 'GetBrand');
    }

    getDriveType(): Observable<any> {
      return this.http.get(this.apiUrl + 'GetDriveType');
    }

    getFuelType(): Observable<any> {
      return this.http.get(this.apiUrl + 'GetFuelType');
    }

    getCarModels(): Observable<any> {
      return this.http.get(this.apiUrl + 'getCarModels');
    }

    getConditions(): Observable<any> {
      return this.http.get(this.apiUrl + 'GetCondition');
    }

    getyears(): Observable<any> {
      return this.http.get(this.apiUrl + 'GetAllYear');
    }

    getcarColors(): Observable<any> {
      return this.http.get(this.apiUrl + 'GetAllCarColors');
    }

    getCarCylinder(): Observable<any> {
      return this.http.get(this.apiUrl + 'GetAllCarCylinder');
    }

    getFeatures(): Observable<any> {
      return this.http.get(this.apiUrl + 'GetAllFeatures');
    }

    gettransmission(): Observable<any> {
      return this.http.get(this.apiUrl + 'GetTransmission');
    }
}


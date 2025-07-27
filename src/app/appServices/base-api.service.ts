import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  private apiUrl = 'https://wheeldeal-001-site1.qtempurl.com/api/Home/';

    constructor(private router: Router, private http:HttpClient) {
    
  }

  getUserInfo(userId:number): Observable<any> {
    return this.http.get(this.apiUrl + `GetUserById?id=${userId}`)
  }
}

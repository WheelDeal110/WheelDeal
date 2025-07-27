import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'UCQerJKKljTUXg7YAwjYDJArhKRp36FCY2qQ1OQj9m';
  private currentUserSubject = new BehaviorSubject<string | null>(this.getToken());
  private apiUrl = 'https://wheeldeal-001-site1.qtempurl.com/api/Home/';
  private userIdKey = 'userId';

  constructor(private router: Router, private http: HttpClient) {
    
  }

  logoutCurrentSession(): void {
    localStorage.clear();
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  get currentToken$(): Observable<string | null> {
    return this.currentUserSubject.asObservable();
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.currentUserSubject.next(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiration = payload.exp * 1000;
        return Date.now() > expiration;
      } catch (e) {
        return true;
      }
    }
    return true;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired();
  }

  setUserId(id: string) {
    localStorage.setItem(this.userIdKey, id);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  createAccount(paramsObject: any): Observable<any> {
    return this.http.post(this.apiUrl + 'UserSignup', paramsObject, {
      responseType: 'json',
    });
  }

  login(paramsObject: any): Observable<any> {
    return this.http.post(this.apiUrl + 'login', paramsObject, {
      responseType: 'json',
    });
  }
}

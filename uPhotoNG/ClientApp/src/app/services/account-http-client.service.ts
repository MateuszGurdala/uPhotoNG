import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, of, Subject } from 'rxjs';
import { RegisterData } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccountHttpClientService {
  baseURL: string = 'https://localhost:7174/';
  isAuthenticated: boolean = false;
  lastAuthenticated: Date;

  constructor(private httpClient: HttpClient) {}

  checkLoginAvailable(login: string): Observable<boolean> {
    return this.httpClient
      .get<boolean>(this.baseURL + 'Account/CheckLoginAvailable', {
        params: new HttpParams().set('login', login),
      })
      .pipe(catchError(() => of(false)));
  }

  checkEmailAvailable(email: string): Observable<boolean> {
    return this.httpClient
      .get<boolean>(this.baseURL + 'Account/CheckEmailAvailable', {
        params: new HttpParams().set('email', email),
      })
      .pipe(catchError(() => of(false)));
  }

  createUserAccount(userData: RegisterData): Observable<boolean> {
    return this.httpClient
      .put<boolean>(this.baseURL + 'Account/CreateAccount', userData)
      .pipe(catchError(() => of(false)));
  }

  signIn(login: string, password: string): Observable<boolean> {
    this.isAuthenticated = true;
    this.lastAuthenticated = new Date();
    return this.httpClient
      .get<boolean>(this.baseURL + 'Account/SignIn', {
        params: new HttpParams().set('login', login).set('password', password),
        withCredentials: true,
      })
      .pipe(catchError(() => of(false)));
  }

  signOut() {
    this.isAuthenticated = false;
    this.lastAuthenticated = new Date();
    return this.httpClient
      .get<boolean>(this.baseURL + 'Account/SignOut', {
        withCredentials: true,
      })
      .pipe(catchError(() => of(false)));
  }

  validateAuthentication(): Observable<boolean> {
    let currentDate = new Date();
    if (
      this.lastAuthenticated === undefined ||
      (currentDate.getTime() - this.lastAuthenticated.getTime() > 5000 &&
        this.isAuthenticated === true) ||
      !this.isAuthenticated
    ) {
      let authRequest = this.requestAuthValidation();
      firstValueFrom(authRequest).then((result) => {
        this.isAuthenticated = result;
        this.lastAuthenticated = new Date();
      });
    }
    console.log(this.isAuthenticated);
    return of(this.isAuthenticated);
  }

  requestAuthValidation(): Observable<boolean> {
    return this.httpClient.get<boolean>(
      this.baseURL + 'Account/ValidateAuthentication',
      {
        withCredentials: true,
      }
    );
  }
}

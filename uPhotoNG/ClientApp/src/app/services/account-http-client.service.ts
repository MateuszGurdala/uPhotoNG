import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject } from 'rxjs';
import { RegisterData } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccountHttpClientService {
  baseURL: string = 'https://localhost:7174/';

  constructor(private httpClient: HttpClient) {}

  checkLoginAvailable(login: string): Observable<boolean> {
    var subject = new Subject<boolean>();
    this.httpClient
      .get<boolean>(this.baseURL + 'Account/CheckLoginAvailable', {
        params: new HttpParams().set('login', login),
      })
      .pipe(catchError(() => of(false)))
      .subscribe((next) => {
        subject.next(next);
      });
    return subject.asObservable();
  }

  checkEmailAvailable(email: string): Observable<boolean> {
    var subject = new Subject<boolean>();
    this.httpClient
      .get<boolean>(this.baseURL + 'Account/CheckEmailAvailable', {
        params: new HttpParams().set('email', email),
      })
      .pipe(catchError(() => of(false)))
      .subscribe((next) => {
        subject.next(next);
      });
    return subject.asObservable();
  }

  createUserAccount(userData: RegisterData): Observable<boolean> {
    var subject = new Subject<boolean>();
    this.httpClient
      .put<boolean>(this.baseURL + 'Account/CreateAccount', userData)
      .pipe(catchError(() => of(false)))
      .subscribe((next) => {
        console.log(next);
        subject.next(next);
      });
    return subject.asObservable();
  }
}

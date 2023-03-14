import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { DatabaseOption } from './interfaces';

@Injectable()
export default class DatabaseHttpClient {
  private baseURL: string = 'https://localhost:7174/';

  constructor(private httpClient: HttpClient) {}

  getDatabaseOption(optionUrl: string): Observable<DatabaseOption[] | boolean> {
    return this.httpClient
      .get<DatabaseOption[] | boolean>(this.baseURL + optionUrl, {
        withCredentials: true,
      })
      .pipe(catchError(() => of(false)));
  }
}

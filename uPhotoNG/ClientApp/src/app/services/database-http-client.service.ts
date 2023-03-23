import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { DatabaseOption, FileHttpData } from './interfaces';
import ToolBox from './tool-box.service';

@Injectable()
export default class DatabaseHttpClient {
  private baseURL: string = 'https://localhost:7174/';

  constructor(private httpClient: HttpClient, private toolBox: ToolBox) {}

  getDatabaseOption(optionUrl: string): Observable<DatabaseOption[] | boolean> {
    return this.httpClient
      .get<DatabaseOption[] | boolean>(this.baseURL + optionUrl, {
        withCredentials: true,
      })
      .pipe(catchError(() => of(false)));
  }

  putAlbumTest(albumName: string): Observable<boolean> {
    return this.httpClient
      .put<boolean>(
        this.baseURL + 'Album/PutAlbumTest',
        {
          albumName: albumName,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
        }
      )
      .pipe(catchError(() => of(false)));
  }

  deleteAlbumTest(albumId: string): Observable<boolean> {
    return this.httpClient
      .delete<boolean>(this.baseURL + 'Album/DeleteAlbumTest', {
        withCredentials: true,
        params: new HttpParams().set('id', this.toolBox.extractGuid(albumId)),
      })
      .pipe(catchError(() => of(false)));
  }

  putPlaceTest(placeName: string): Observable<boolean> {
    return this.httpClient
      .put<boolean>(
        this.baseURL + 'Place/PutPlaceTest',
        {
          placeName: placeName,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
        }
      )
      .pipe(catchError(() => of(false)));
  }

  deletePlaceTest(placeId: string): Observable<boolean> {
    return this.httpClient
      .delete<boolean>(this.baseURL + 'Place/DeletePlaceTest', {
        withCredentials: true,
        params: new HttpParams().set('id', this.toolBox.extractGuid(placeId)),
      })
      .pipe(catchError(() => of(false)));
  }

  putPhoto(fileData: FileHttpData): Observable<boolean> {
    return this.httpClient
      .put<any>(this.baseURL + 'File/UploadPhoto', fileData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
      .pipe(catchError(() => of(false)));
  }
}

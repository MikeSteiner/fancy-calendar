import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    const url = 'http://localhost:3000/meetings';
    const params = new HttpParams();
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const reqObj = {params, headers};

    return this.http.get<any>(url, reqObj).pipe(
      tap((all) => console.log(all))
    );
  }
}

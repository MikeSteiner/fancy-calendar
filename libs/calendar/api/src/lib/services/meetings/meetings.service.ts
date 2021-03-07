import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {Meeting} from '@fancy-calendar/calendar/types';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Meeting[]> {
    const url = 'http://localhost:3000/meetings';
    const params = new HttpParams();
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const reqObj = {params, headers};

    return this.http.get<Meeting[]>(url, reqObj).pipe(
      // tap((res) => console.log(res)),
      map((meetings) => meetings.map(
        (meeting: Meeting) => {
          const start: Date = new Date(meeting.start);
          const end: Date = new Date(meeting.end);
          return {
            ...meeting,
            start,
            end,
          }
        }
      )),
      tap((all) => console.log(all)),
    );
  }

  getByMonth(year: number, month: number): Observable<Meeting[]> {
    // Todo this filtering has to be done in the backend
    return this.getAll().pipe(
      // tap((res) => console.log(res)),
      map((meetings: Meeting[]) => {
        return meetings.filter((meeting: Meeting) => {
          return (meeting.start.getFullYear() === year && meeting.start.getMonth() === month) || (meeting.end.getFullYear() === year && meeting.end.getMonth() === month);
        });
      }),
      tap((all) => console.log(all)),
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable} from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { Meeting } from '@fancy-calendar/calendar/types';
import { environment } from '../../../../../../../apps/calendar-app/src/environments/environment';

const MEETINGS_ENDPOINT = 'meetings';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {
  private url: string = `${environment.baseApiUrl}/${MEETINGS_ENDPOINT}/`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Meeting[]> {
    // const url = 'http://localhost:3000/meetings';
    const params = new HttpParams();
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const reqObj = {params, headers};

    return this.http.get<Meeting[]>(this.url, reqObj).pipe(
      delay(400),
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
      // tap((all) => console.log(all)),
    );
  }

  // Todo this filtering has to be done in the backend
  getByMonth(year: number, month: number): Observable<Meeting[]> {
    return this.getAll().pipe(
      map((meetings: Meeting[]) => {
        return meetings.filter((meeting: Meeting) => {
          return (meeting.start.getFullYear() === year && meeting.start.getMonth() === month) || (meeting.end.getFullYear() === year && meeting.end.getMonth() === month);
        });
      }),
      // tap((all) => console.log(all)),
    );
  }
}

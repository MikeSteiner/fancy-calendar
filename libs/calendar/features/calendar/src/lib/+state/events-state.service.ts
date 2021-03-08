import { Injectable } from '@angular/core';
import { MeetingsService } from "@fancy-calendar/calendar/api";
import { BehaviorSubject, Observable } from 'rxjs';

import { Meeting } from '@fancy-calendar/calendar/types';
import { map } from "rxjs/operators";

@Injectable()
export class EventsStateService {
  private _events$: BehaviorSubject<Meeting[]> = new BehaviorSubject<Meeting[]>([]);

  get events$(): Observable<Meeting[]> {
    return this._events$.asObservable()
  };

  constructor(private meetingsService: MeetingsService) { }

  loadMonthlyEvents(year: number, month: number): void {
    this.meetingsService.getByMonth(year, month).subscribe(
      (events) => {
        this._events$.next(events);
      },
      (error) => { return console.log("Error retrieving Todos"); }
    );
  }

  getDailyEvents(day: number): Observable<Meeting[]> {
    return this.events$.pipe(
      map((events: Meeting[]) => events.filter((event) => {
        const isInCurrentDay: boolean = event.start.getDate() === day;
        return isInCurrentDay;
      }))
    )
  }
}

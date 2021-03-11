import { Injectable } from '@angular/core';
import { MeetingsService } from "@fancy-calendar/calendar/api";
import { BehaviorSubject, Observable } from 'rxjs';

import { Meeting } from '@fancy-calendar/calendar/types';
import { map } from "rxjs/operators";

@Injectable()
export class EventsStateService {
  private _events$: BehaviorSubject<Meeting[]> = new BehaviorSubject<Meeting[]>([]);
  private _eventsLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get events$(): Observable<Meeting[]> {
    console.log('GET events$');
    return this._events$.asObservable()
  };

  get eventsLoading$(): Observable<boolean> {
    return this._eventsLoading$.asObservable()
  };

  constructor(private meetingsService: MeetingsService) { }

  loadMonthlyEvents(year: number, month: number): void {
    console.log('LOAD events API');
    this._eventsLoading$.next(true);
    this.meetingsService.getByMonth(year, month).subscribe(
      (meetings) => {
        const meetingsUpdated: Meeting[] = meetings.map((meeting) => {
          return {
            ...meeting,
            conflictMeetingIds: [],
          }
        });
        this._events$.next(meetingsUpdated);
        this._eventsLoading$.next(false);
      },
      (error) => {
        this._eventsLoading$.next(false);
        return console.log("Error get event by month");
      }
    );
  }

  getDailyEvents(date: Date): Observable<Meeting[]> {
    return this.events$.pipe(
      map((events: Meeting[]) => events.filter((event) => {
        const isInCurrentDate: boolean =
          event.start.getDate() === date.getDate() &&
          event.start.getMonth() === date.getMonth() &&
          event.start.getFullYear() === date.getFullYear();

        return isInCurrentDate;
      }))
    )
  }

  getDailyEventsOrdered(date: Date): Observable<Meeting[]> {
    return this.getDailyEvents(date).pipe(
      map((events: Meeting[]) => {
        const orderedEvents: Meeting[] = events.sort((first, second) => this.compareDates(first.start, second.start));
        return orderedEvents;
      }),
    )
  }

  getDailyEventsOrderedWithConflictMeetings(date: Date): Observable<Meeting[]> {
    return this.getDailyEventsOrdered(date).pipe(
      map((meetings: Meeting[]) => {
        const comparedEvents = meetings;
        comparedEvents.forEach((meeting, index) => {
          comparedEvents.forEach((meeting2, index2) => {
            if(index !== index2) {
              const haveConflict = this.compareConflictMeetings(meeting, meeting2);
              if(haveConflict) {
                meeting.conflictMeetingIds.push(index2);
              }
            }
          })
        });

        return comparedEvents;
      })
    )
  }

  // Todo extract to date management service
  private compareDates(a: Date, b: Date): number {
    const msDateA: number = a.getTime();
    const msDateB: number = b.getTime();

    const dateDifference = msDateA - msDateB;
    if(dateDifference > 0) {
      return 1;
    } else if(dateDifference < 0) {
      return -1;
    }

    return 0;
  }

  private compareConflictMeetings(meetingA: Meeting, meetingB: Meeting): boolean {
    const haveConflictTime: boolean = (meetingA.start.getTime() < meetingB.end.getTime()) && (meetingB.start.getTime() < meetingA.end.getTime());
    const haveConflictRoom: boolean = meetingA.meetingRoom === meetingB.meetingRoom;

    return haveConflictTime && haveConflictRoom;
  }
}

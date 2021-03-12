import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { MeetingsService } from '@fancy-calendar/calendar/api';
import { Meeting } from '@fancy-calendar/calendar/types';

import { BaseStateService } from './base-state.service';

interface MeetingsState {
  loading: boolean
  meetings: Meeting[];
}

const initialState: MeetingsState = {
  loading: false,
  meetings: [],
};

@Injectable()
export class MeetingsStateService extends BaseStateService<MeetingsState>{
  loading$: Observable<boolean> = super.select((state): boolean => state.loading);
  meetings$: Observable<Meeting[]> = super.select((state): Meeting[] => state.meetings);

  constructor(private meetingsService: MeetingsService) {
    super(initialState);
  }

  loadMonthlyEvents(year: number, month: number): void {
    console.log('LOAD events API');
    super.setState({ loading: true });
    this.meetingsService.getByMonth(year, month).subscribe(
      (meetings) => {
        const meetingsUpdated: Meeting[] = meetings.map((meeting) => {
          return {
            ...meeting,
            conflictMeetingIds: [],
          }
        });
        super.setState({ meetings: meetingsUpdated });
        super.setState({ loading: false });
      },
      (error) => {
        super.setState({ loading: false });
        return console.log("Error get event by month");
      }
    );
  }

  // Todo fix refetching the meetings on view port click
  getDailyEvents(date: Date): Observable<Meeting[]> {
    console.log('SELECT daily events '+date.getDate());
    return this.meetings$.pipe(
      map((events: Meeting[]) => events.filter((event) => {
        const isInCurrentDate: boolean =
          event.start.getDate() === date.getDate() &&
          event.start.getMonth() === date.getMonth() &&
          event.start.getFullYear() === date.getFullYear();

        return isInCurrentDate;
      })),
      distinctUntilChanged()
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

  // Todo improve the nested loop algorithm
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
      }),
      distinctUntilChanged()
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

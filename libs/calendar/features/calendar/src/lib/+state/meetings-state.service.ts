import { Injectable } from '@angular/core';
import { MeetingsService } from "@fancy-calendar/calendar/api";
import { Meeting } from "@fancy-calendar/calendar/types";
import { Observable } from "rxjs";
import { BaseStateService } from "./base-state.service";

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
  loading$: Observable<boolean> = super.select(state => state.loading);
  meetings$: Observable<Meeting[]> = super.select(state => state.meetings);

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
}

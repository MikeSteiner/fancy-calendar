import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Day, Meeting } from '@fancy-calendar/calendar/types';

import { EventsStateService } from "../../+state/events-state.service";

@Component({
  selector: 'fancy-calendar-calendar-day-details',
  templateUrl: './calendar-day-details.component.html',
  styleUrls: ['./calendar-day-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDayDetailsComponent implements OnInit {
  private _dayDate: Date;
  // @Input() day: Day;
  // @Input() events: Meeting[];
  @Input() set day(value: Day) {
    if(value.number){
      this.events$ = this.eventsState.getDailyEventsOrdered(value.date);
      this._dayDate = value.date;
    }
  };
  @Input() locale: string;

  get title() {
    const options = { month: 'long', year: 'numeric', day: 'numeric'};
    return new Intl.DateTimeFormat(this.locale, options).format(this._dayDate);
  }

  events$: Observable<Meeting[]>;

  constructor(private eventsState: EventsStateService) { }

  ngOnInit(): void {
  }

  getTime(date: Date) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat(this.locale, options).format(date);
  }

}

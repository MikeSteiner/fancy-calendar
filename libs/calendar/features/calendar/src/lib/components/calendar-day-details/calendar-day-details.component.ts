import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Day, Meeting } from '@fancy-calendar/calendar/types';

@Component({
  selector: 'fancy-calendar-calendar-day-details',
  templateUrl: './calendar-day-details.component.html',
  styleUrls: ['./calendar-day-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDayDetailsComponent implements OnInit {
  @Input() day: Day;
  @Input() events$: Observable<Meeting[]>;
  @Input() locale: string;

  get title() {
    const options = { month: 'long', year: 'numeric', day: 'numeric'};
    return new Intl.DateTimeFormat(this.locale, options).format(this.day.date);
  }

  getTime(date: Date) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat(this.locale, options).format(date);
  }

  constructor() { }

  ngOnInit(): void {
  }

}

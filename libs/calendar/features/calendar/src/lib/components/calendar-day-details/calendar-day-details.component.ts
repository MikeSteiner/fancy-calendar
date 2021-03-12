import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Day, Meeting } from '@fancy-calendar/calendar/types';

@Component({
  selector: 'fancy-calendar-calendar-day-details',
  templateUrl: './calendar-day-details.component.html',
  styleUrls: ['./calendar-day-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDayDetailsComponent implements OnInit {
  private _dayDate: Date;

  @Input() day: Day;
  @Input() events: Meeting[];
  @Input() locale: string;

  get title() {
    const options = { month: 'long', year: 'numeric', day: 'numeric'};
    return new Intl.DateTimeFormat(this.locale, options).format(this._dayDate);
  }

  constructor() { }

  ngOnInit(): void {
  }

  getTime(date: Date) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat(this.locale, options).format(date);
  }

}

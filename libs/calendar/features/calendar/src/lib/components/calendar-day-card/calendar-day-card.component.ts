import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Day, Meeting } from '@fancy-calendar/calendar/types';

@Component({
  selector: 'fancy-calendar-calendar-day-card',
  templateUrl: './calendar-day-card.component.html',
  styleUrls: ['./calendar-day-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDayCardComponent implements OnInit {
  @Input() day: Day;
  @Input() eventsLoading: boolean = true;
  @Input() events: Meeting[];
  @Input() locale: string;
  @Input() isDisabled: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  getTime(date: Date) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat(this.locale, options).format(date);
  }
}

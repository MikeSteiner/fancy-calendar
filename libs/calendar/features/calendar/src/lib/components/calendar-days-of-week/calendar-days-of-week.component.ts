import { Component, Input, OnInit } from '@angular/core';

import { Day } from '@fancy-calendar/calendar/types';

const YEAR_2021 = 2021;
const MONTH_MARCH_INDEX = 2;

@Component({
  selector: 'fancy-calendar-calendar-days-of-week',
  templateUrl: './calendar-days-of-week.component.html',
  styleUrls: ['./calendar-days-of-week.component.scss']
})
export class CalendarDaysOfWeekComponent implements OnInit {
  @Input() locale: string;

  daysOfWeek: Day[] = [];

  constructor() {
    this.generateDaysForWeekStartingOnMonday();
  }

  ngOnInit(): void {
  }

  getDayOfWeekName(date: Date): string {
    const options = {  weekday: 'short' };
    return new Intl.DateTimeFormat(this.locale, options).format(date);
  }

  private generateDaysForWeekStartingOnMonday(): void {
    for (let i = 1; i <= 7; i++) {
      let isWeekend = false;
      if ([6, 7].includes(i)) {
        isWeekend = true;
      }

      this.daysOfWeek.push({
        number: i,
        date: new Date(YEAR_2021, MONTH_MARCH_INDEX, i),
        isWeekend,
      } as Day)
    }
  }
}

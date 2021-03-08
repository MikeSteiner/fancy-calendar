import { Component, OnInit } from '@angular/core';
import {Day} from "@fancy-calendar/calendar/types";

@Component({
  selector: 'fancy-calendar-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  days: Day[] = [
    { number: 1, date: new Date(), isWeekend: false}
  ];

  constructor() {
    for (let i = 1; i <= 31; i++) {
      let isToday = false;
      if( i === 8)  {
        isToday = true;
      }

      let isWeekend = false;
      if( [5, 6, 12, 13, 19, 20, 26, 27].includes(i))  {
        isWeekend = true;
      }

      const events = ['Daily stand-up', 'Meeting'];

      // year: number, month: number, date?: number
      this.days.push({
        number: i,
        date: new Date(2021, 2, i),
        isWeekend,
        isToday,
        events: (i === 5 || i === 8) ? events : [],
      } as Day)
    }
  }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';

import { Day, Meeting } from '@fancy-calendar/calendar/types';
import { Observable } from "rxjs";

@Component({
  selector: 'fancy-calendar-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {
  @Input() day: Day;
  @Input() events$: Observable<Meeting[]>;
  @Input() locale: string;

  constructor() { }

  ngOnInit(): void {
  }

}

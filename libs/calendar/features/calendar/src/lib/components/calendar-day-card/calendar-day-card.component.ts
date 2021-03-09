import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Day, Meeting } from '@fancy-calendar/calendar/types';
import { Observable } from "rxjs";

@Component({
  selector: 'fancy-calendar-calendar-day-card',
  templateUrl: './calendar-day-card.component.html',
  styleUrls: ['./calendar-day-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDayCardComponent implements OnInit {
  @Input() day: Day;
  @Input() events$: Observable<Meeting[]>;
  @Input() locale: string;


  constructor() { }

  ngOnInit(): void {
  }

}

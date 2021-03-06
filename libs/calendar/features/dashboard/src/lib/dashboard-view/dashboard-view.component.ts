import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

import {MeetingsService} from "../../../../../api/src/lib/meetings/meetings.service";
import {WeekService} from "../../../../../api/src/lib/week/week.service";
import {MonthService} from "../../../../../api/src/lib/month/month.service";
import {CalendarGeneratorService} from "../../../../../api/src/lib/calendar-generator/calendar-generator.service";
import {Week, WeekUTCDay} from "../../../../../api/src/lib/types/types";

@Component({
  selector: 'fancy-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {

  current = new Date();
  prev = this.calendarGeneratorService.addDays(this.current, -31);
  next = this.calendarGeneratorService.addDays(this.current, 31) ;

  meetings = this.meetingsService.getAll();

  // weekNumber = this.weekService.getNumber(this.current);
  // weekNumbersInMonth = this.calendarGeneratorService.getWeekNumbersInMonth(this.current);
  // weeksInMonth = this.calendarGeneratorService.getWeeksInMonth(this.current.getFullYear(), this.current.getMonth());
  // weeksInMonth: Week[];

  // weeksInMonth: Week[] = this.calendarGeneratorService.getWeeksInMonth(this.current.getFullYear(), this.current.getMonth());
  weeksInMonth: Week[] = this.calendarGeneratorService.getWeeksInMonth(this.next.getFullYear(), this.next.getMonth());

  daysOfWeek = Object.keys(WeekUTCDay).filter((e) => isNaN(Number(e)));

  constructor(
    private meetingsService: MeetingsService,
    private weekService: WeekService,
    private monthService: MonthService,
    private calendarGeneratorService: CalendarGeneratorService
  ) {
    console.log(this.next)
  }

  ngOnInit(): void {
    // this.meetings = this.meetingsService.getAll();
  }

}

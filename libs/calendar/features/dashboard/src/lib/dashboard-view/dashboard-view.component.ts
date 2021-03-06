import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {MeetingsService} from "../../../../../api/src/lib/meetings/meetings.service";
import {WeekService} from "../../../../../api/src/lib/week/week.service";
import {MonthService} from "../../../../../api/src/lib/month/month.service";
import {CalendarGeneratorService} from "../../../../../api/src/lib/calendar-generator/calendar-generator.service";

@Component({
  selector: 'fancy-calendar-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {

  current: Date = new Date();
  prev: Date = this.addDays(this.current, -1);
  next: Date = this.addDays(this.current, 1) ;

  meetings = this.meetingsService.getAll();
  weekNumber = this.weekService.getNumber(this.current);
  weekNumbersInMonth = this.calendarGeneratorService.getWeekNumbersInMonth(this.current);
  weeksInMonth = this.calendarGeneratorService.getWeeksInMonth(this.current.getFullYear(), this.current.getMonth());


  constructor(
    private meetingsService: MeetingsService,
    private weekService: WeekService,
    private monthService: MonthService,
    private calendarGeneratorService: CalendarGeneratorService
  ) { }

  ngOnInit(): void {
    // this.meetings = this.meetingsService.getAll();
  }

  private addDays(date, days): Date {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}

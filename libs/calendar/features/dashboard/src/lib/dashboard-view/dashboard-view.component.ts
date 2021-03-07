import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Meeting, Week, WeekUTCDay} from '@fancy-calendar/calendar/types';
import {CalendarGeneratorService, MonthService, WeekService} from '@fancy-calendar/calendar/dates';
import {MeetingsService} from '@fancy-calendar/calendar/api';

@Component({
  selector: 'fancy-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardViewComponent implements OnInit {
  private _meetings$: BehaviorSubject<Meeting[]> = new BehaviorSubject<Meeting[]>([]);

  private get year(): number {
    return this.displayDate.getFullYear();
  }

  private get month(): number {
    return this.displayDate.getMonth();
  }

  private get daysInMonthCount(): number {
    return this.monthService.countDays(this.year, this.month);
  }

  get meetings$(): Observable<Meeting[]> {
    return this._meetings$.asObservable()
  };

  displayDate = new Date();
  weeksInMonth: Week[];

  daysOfWeek = Object.keys(WeekUTCDay).filter((e) => isNaN(Number(e)));

  constructor(
    private meetingsService: MeetingsService,
    private weekService: WeekService,
    private monthService: MonthService,
    private calendarGeneratorService: CalendarGeneratorService
  ) { }

  ngOnInit(): void {
    this.loadMeetingsPerMonth();
    this.loadWeeksPerMonth();
  }

  onPrevMonthClick(): void {
    this.displayDate = this.calendarGeneratorService.addDays(this.displayDate, (-1) * this.daysInMonthCount);
    this.loadMeetingsPerMonth();
    this.loadWeeksPerMonth();
  }

  onNextMonthClick(): void {
    this.displayDate = this.calendarGeneratorService.addDays(this.displayDate, this.daysInMonthCount);
    this.loadMeetingsPerMonth();
    this.loadWeeksPerMonth();
  }

  onTodayClick(): void {
    this.displayDate = new Date();
    this.loadMeetingsPerMonth();
    this.loadWeeksPerMonth();
  }

  loadMeetingsPerDay(day: number): Observable<Meeting[]> {
    return this.meetings$.pipe(
      map((meetings: Meeting[]) => meetings.filter((meeting) => {
        const isInCurrentDay: boolean = meeting.start.getDate() === day;
        return isInCurrentDay;
      }))
    )
  }

  private loadMeetingsPerMonth(): void {
    this.meetingsService.getByMonth(this.year, this.month).subscribe(
      (meetings) => {
        this._meetings$.next(meetings);
      },
      (error) => { return console.log("Error retrieving Todos"); }
      );
  }

  private loadWeeksPerMonth(): void {
    this.weeksInMonth = this.calendarGeneratorService.getWeeksInMonth(this.year, this.month);
  }
}

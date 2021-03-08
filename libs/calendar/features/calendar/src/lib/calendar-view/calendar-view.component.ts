import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

import {Day, Meeting, Week} from "@fancy-calendar/calendar/types";
import {CalendarGeneratorService, MonthService, WeekService} from "@fancy-calendar/calendar/dates";
import {MeetingsService} from "@fancy-calendar/calendar/api";
import {ModalService} from "@fancy-calendar/shared/modal";
import {LocaleService} from "../../../../../dates/src/lib/service/locale";

@Component({
  selector: 'fancy-calendar-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarViewComponent implements OnInit {
  private _meetings$: BehaviorSubject<Meeting[]> = new BehaviorSubject<Meeting[]>([]);

  get meetings$(): Observable<Meeting[]> {
    return this._meetings$.asObservable()
  };

  private get year(): number {
    return this.displayDate.getFullYear();
  }

  private get month(): number {
    return this.displayDate.getMonth();
  }

  private get daysInMonthCount(): number {
    return this.monthService.countDays(this.year, this.month);
  }

  locale = 'en-US';
  // locale = 'de-DE';
  // locale = 'bg-BG';

  displayDate = new Date();
  weeksInMonth: Week[];

  days: Day[] = [
    { number: 1, date: new Date(), isWeekend: false}
  ];

  constructor(
    private weekService: WeekService,
    private monthService: MonthService,
    private calendarGeneratorService: CalendarGeneratorService,
    private meetingsService: MeetingsService,
    private modalService: ModalService,
    private localeService: LocaleService,
  ) {
    this.locale = this.localeService.getBrowserLanguage();
    this.makeFakeDays();
  }

  ngOnInit(): void {
  }

  onPreviousMonthClick(): void {
    this.displayDate = this.calendarGeneratorService.addDays(this.displayDate, (-1) * this.daysInMonthCount);
    // this.loadMeetingsPerMonth();
    // this.loadWeeksPerMonth();
  }

  onNextMonthClick(): void {
    this.displayDate = this.calendarGeneratorService.addDays(this.displayDate, this.daysInMonthCount);
    // this.loadMeetingsPerMonth();
    // this.loadWeeksPerMonth();
  }

  onTodayClick(): void {
    this.displayDate = new Date();
    // this.loadMeetingsPerMonth();
    // this.loadWeeksPerMonth();
  }

  private makeFakeDays(): void {
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
}

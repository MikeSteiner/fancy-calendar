import { ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';

import { Day, Meeting, Week } from '@fancy-calendar/calendar/types';
import { CalendarGeneratorService, MonthService, WeekService } from '@fancy-calendar/calendar/dates';
import { MeetingsService } from '@fancy-calendar/calendar/api';
import { ModalService } from '@fancy-calendar/shared/modal';
import { LocaleService } from '@fancy-calendar/calendar/dates';

import { EventsStateService } from '../+state/events-state.service';

@Component({
  selector: 'fancy-calendar-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarViewComponent implements OnInit {
  readonly selectedDayModalId = 'selected-day-modal';

  private get year(): number {
    return this.displayDate.getFullYear();
  }

  private get month(): number {
    return this.displayDate.getMonth();
  }

  private get prevMonth(): number {
    const monthIndex = this.month;
    if(monthIndex === 0) {
      return 11;
    }
    return this.month - 1;
  }

  private get daysInMonthCount(): number {
    return this.monthService.countDays(this.year, this.month);
  }

  private get daysInPrevMonthCount(): number {
    return this.monthService.countDays(this.year, this.prevMonth);
  }

  locale = 'en-US';
  // locale = 'de-DE';
  // locale = 'bg-BG';

  displayDate = new Date();
  weeksInMonth: Week[];
  selectedDay: Day;
  dateEventsMap: Map<Date, Meeting[]> = new Map<Date, Meeting[]>();
  eventsLoading$: Observable<boolean>;

  constructor(
    private weekService: WeekService,
    private monthService: MonthService,
    private calendarGeneratorService: CalendarGeneratorService,
    private meetingsService: MeetingsService,
    private eventsState: EventsStateService,
    private modalService: ModalService,
    private localeService: LocaleService,
  ) {
    this.locale = this.localeService.getBrowserLanguage();
  }

  ngOnInit(): void {
    this.eventsState.loadMonthlyEvents(this.year, this.month);
    this.eventsLoading$ = this.eventsState.eventsLoading$;
    // this.dateEventsMap = this.eventsState.events$.pipe(
    // );
    this.loadWeeksPerMonth();
  }

  onPreviousMonthClick(): void {
    this.displayDate = this.calendarGeneratorService.addDays(this.displayDate, (-1) * this.daysInPrevMonthCount);
    this.eventsState.loadMonthlyEvents(this.year, this.month);
    this.loadWeeksPerMonth();
  }

  onNextMonthClick(): void {
    this.displayDate = this.calendarGeneratorService.addDays(this.displayDate, this.daysInMonthCount);
    this.eventsState.loadMonthlyEvents(this.year, this.month);
    this.loadWeeksPerMonth();
  }

  onTodayClick(): void {
    this.displayDate = new Date();
    this.eventsState.loadMonthlyEvents(this.year, this.month);
    this.loadWeeksPerMonth();
  }

  closeModal() {
    this.modalService.close(this.selectedDayModalId);
    this.selectedDay = null;
  }

  onSelectDay(day: Day) {
    this.modalService.open(this.selectedDayModalId);
    this.selectedDay = day;
  }

  getDailyEvents(date: Date): Observable<Meeting[]> {
    // return this.eventsState.getDailyEvents(dayNumber);
    console.log(date)
    return this.eventsState.getDailyEventsOrdered(date);
  }

  private loadWeeksPerMonth(): void {
    this.weeksInMonth = this.calendarGeneratorService.getWeeksInMonth(this.year, this.month);
  }

  // Todo use for the isToday generation
  // private makeFakeDays(): void {
  //   for (let i = 1; i <= 31; i++) {
  //     let isToday = false;
  //     if( i === 8)  {
  //       isToday = true;
  //     }
  //
  //     let isWeekend = false;
  //     if( [5, 6, 12, 13, 19, 20, 26, 27].includes(i))  {
  //       isWeekend = true;
  //     }
  //
  //     const events = ['Daily stand-up', 'Meeting'];
  //
  //     // year: number, month: number, date?: number
  //     this.days.push({
  //       number: i,
  //       date: new Date(2021, 2, i),
  //       isWeekend,
  //       isToday,
  //       events: (i === 5 || i === 8) ? events : [],
  //     } as Day)
  //   }
  // }
}

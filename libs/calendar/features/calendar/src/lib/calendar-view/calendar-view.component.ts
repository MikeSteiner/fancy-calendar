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
    // this.locale = 'de-DE';
    // this.locale = 'bg-BG';
  }

  ngOnInit(): void {
    this.eventsState.loadMonthlyEvents(this.year, this.month);
    this.eventsLoading$ = this.eventsState.eventsLoading$;
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
    return this.eventsState.getDailyEventsOrdered(date);
  }

  private loadWeeksPerMonth(): void {
    // this.weeksInMonth = this.calendarGeneratorService.getWeeksInMonth(this.year, this.month);
    this.weeksInMonth = this.calendarGeneratorService.getWeeksInMonthWithDisabledDayState(this.year, this.month);
  }
}

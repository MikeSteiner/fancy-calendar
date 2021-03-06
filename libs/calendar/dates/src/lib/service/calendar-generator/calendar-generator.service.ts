import { Injectable } from '@angular/core';

import {Day, Week, WeekUTCDay} from '@fancy-calendar/calendar/types';

import { WeekService } from '../week/week.service';
import { MonthService } from '../month/month.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarGeneratorService {

  constructor(private weekService: WeekService, private monthService: MonthService) { }

  getWeekNumbersInMonth(date: Date): number[] {
    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    const firstDateInMonth = new Date(year, month, this.monthService.getFirstDay());
    const lastDateInMonth = new Date(year, month, this.monthService.getLastDay(year, month));
    let firstWeekNumber: number = this.weekService.getNumber(firstDateInMonth);
    const lastWeekNumber: number = this.weekService.getNumber(lastDateInMonth);

    if(firstWeekNumber > lastWeekNumber) {
      firstWeekNumber = 0;
    }

    const weekNumbers: number[] = this.range(firstWeekNumber, lastWeekNumber, 1);

    return weekNumbers;
  }

  getWeeksInMonth(year: number, month: number): Week[] {
    const dateOne: Date = new Date(year, month, this.monthService.getFirstDay());
    const weekNumbers: number[] = this.getWeekNumbersInMonth(dateOne);

    const weeks = [];
    weekNumbers.forEach((n, index) => {
      const date = this.addDays(dateOne, 7 * index);
      const newWeek = this.generateWeek(date);
      weeks.push(newWeek);
    });

    return weeks;
  }

  getWeeksInMonthWithDisabledDayState(year: number, month: number): Week[] {
    const weeks: Week[] = this.getWeeksInMonth(year, month);
    const weeksUpdated: Week[] = weeks.map((week: Week) => {
      return {
        ...week,
        days: week.days.map((day) => {
          return {
            ...day,
            inDisabled: (day.date.getMonth() !== month),
          }
        })
      }
    });

    return weeksUpdated;
  }

  private generateDay(date: Date): Day {
    const now: Date = new Date();
    const number = date.getDate();
    const isWeekend: boolean = date.getUTCDay() === WeekUTCDay.Saturday || date.getUTCDay() === WeekUTCDay.Sunday;
    const isToday: boolean =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    return {
      number,
      date,
      isWeekend,
      isToday,
    }
  }

  private generateWeek(date: Date): Week {
    const days: Day[] = [];
    let dayOfWeekIndex: number;

    const startIndex = date.getUTCDay();
    const startOfWeekDaysOffset = (-1) * (startIndex);
    let nextDate: Date = this.addDays(date, startOfWeekDaysOffset);

    do {
      const newDay: Day = this.generateDay(nextDate);
      dayOfWeekIndex = nextDate.getUTCDay();
      days[dayOfWeekIndex] = newDay;
      nextDate =  this.addDays(nextDate, 1);
    } while (dayOfWeekIndex <= WeekUTCDay.Sunday && days.length < 7);

    return {
      number: this.weekService.getNumber(date),
      days,
    }
  }

  private range(start: number, stop: number, step: number): number[] {
    return Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
  }

  // Todo add to the Date.prototype
  addDays(date: Date, days: number): Date {
    let newDate: Date = new Date(date);
    newDate.setDate(newDate.getDate() + days);

    return newDate;
  }
}

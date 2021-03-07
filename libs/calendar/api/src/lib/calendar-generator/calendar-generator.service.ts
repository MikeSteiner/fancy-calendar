import { Injectable } from '@angular/core';

import { WeekService } from '../week/week.service';
import { MonthService } from '../month/month.service';
import {Day, Week, WeekUTCDay} from '../types/types';

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
    const firstWeekNumber: number = this.weekService.getNumber(firstDateInMonth);
    const lastWeekNumber: number = this.weekService.getNumber(lastDateInMonth);

    const weekNumbers: number[] = this.range(firstWeekNumber, lastWeekNumber, 1);

    console.log(weekNumbers);

    return weekNumbers;
  }

  getWeeksInMonth(year: number, month: number): Week[] {
    const dateOne: Date = new Date(year, month, this.monthService.getFirstDay());
    console.log(dateOne);

    const weekNumbers: number[] = this.getWeekNumbersInMonth(dateOne);

    const weeks = [];
    weekNumbers.forEach((n, index) => {
      const date = this.addDays(dateOne, 7 * index);
      const newWeek = this.generateWeek(date);
      weeks.push(newWeek);
    });

    return weeks;
  }

  private generateDay(date: Date): Day {
    const number = date.getDate();
    const isWeekend: boolean = date.getUTCDay() === WeekUTCDay.Saturday || date.getUTCDay() === WeekUTCDay.Sunday;

    return {
      number,
      date,
      isWeekend,
    }
  }

  private generateWeek(date: Date): Week {
    const days: Day[] = [];
    let dayOfWeekIndex: number;

    const startIndex = date.getUTCDay();
    const startOfWeekDaysOffset = (-1) * (startIndex);
    let nextDate: Date = this.addDays(date, startOfWeekDaysOffset);

    console.log(nextDate);
    do {
      const newDay: Day = this.generateDay(nextDate);
      dayOfWeekIndex = nextDate.getUTCDay();
      days[dayOfWeekIndex] = newDay;
      nextDate =  this.addDays(nextDate, 1);
    } while (dayOfWeekIndex <= WeekUTCDay.Sunday && days.length < 7);

    console.log(days);

    return {
      number: this.weekService.getNumber(date),
      days,
    }
  }

  private range(start: number, stop: number, step: number): number[] {
    return Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
  }

  addDays(date: Date, days: number): Date {
    let newDate: Date = new Date(date);
    newDate.setDate(newDate.getDate() + days);

    return newDate;
  }
}

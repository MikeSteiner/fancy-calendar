import { Injectable } from '@angular/core';
import {WeekService} from "../week/week.service";
import {MonthService} from "../month/month.service";

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

  getWeeksInMonth(year: number, month: number): number[] {
    const dateOne: Date = new Date(year, month, this.monthService.getFirstDay());
    const dateOneIndex = dateOne.getUTCDay();
    console.log(dateOneIndex);

    const weekNumbers: number[] = this.getWeekNumbersInMonth(dateOne);

    const weeks = [];
    weekNumbers.forEach((n) => {
      const days = []
      const newWeek = {
        number: n,
        days: [dateOne, dateOne, dateOne, dateOne, dateOne, dateOne, dateOne]
      };
      weeks.push(newWeek);
    });

    return weeks;
  }

  private range(start: number, stop: number, step: number): number[] {
    return Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
  }
}

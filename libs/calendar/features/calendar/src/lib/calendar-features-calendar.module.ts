import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

import {SharedModalModule} from "@fancy-calendar/shared/modal";
import { EventsStateService } from "./+state/events-state.service";

import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { CalendarTitleComponent } from './components/calendar-title/calendar-title.component';
import { CalendarMonthNavigationComponent } from './components/calendar-month-navigation/calendar-month-navigation.component';
import { CalendarDaysOfWeekComponent } from './components/calendar-days-of-week/calendar-days-of-week.component';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CalendarViewComponent,
      }
    ]),
    SharedModalModule,
  ],
  declarations: [CalendarViewComponent, CalendarTitleComponent, CalendarMonthNavigationComponent, CalendarDaysOfWeekComponent, CalendarDayComponent],
  providers: [EventsStateService],
})
export class CalendarFeaturesCalendarModule {}

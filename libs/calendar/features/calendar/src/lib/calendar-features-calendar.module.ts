import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

import {SharedModalModule} from "@fancy-calendar/shared/modal";
import { EventsStateService } from "./+state/events-state.service";

import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { CalendarDayCardComponent } from "./components/calendar-day-card/calendar-day-card.component";
import { CalendarTitleComponent } from './components/calendar-title/calendar-title.component';
import { CalendarMonthNavigationComponent } from './components/calendar-month-navigation/calendar-month-navigation.component';
import { CalendarDaysOfWeekComponent } from './components/calendar-days-of-week/calendar-days-of-week.component';
import { CalendarDayDetailsComponent } from './components/calendar-day-details/calendar-day-details.component';

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
  declarations: [
    CalendarViewComponent,
    CalendarTitleComponent,
    CalendarMonthNavigationComponent,
    CalendarDaysOfWeekComponent,
    CalendarDayCardComponent,
    CalendarDayDetailsComponent
  ],
  providers: [EventsStateService],
})
export class CalendarFeaturesCalendarModule {}

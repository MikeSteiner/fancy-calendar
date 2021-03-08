import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

import {SharedModalModule} from "@fancy-calendar/shared/modal";

import { CalendarViewComponent } from './calendar-view/calendar-view.component';

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
  declarations: [CalendarViewComponent],
})
export class CalendarFeaturesCalendarModule {}

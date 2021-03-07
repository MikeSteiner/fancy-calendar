import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MeetingsService } from '@fancy-calendar/calendar/api';
import { SharedModalModule } from '@fancy-calendar/shared/modal';

import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { TimeNavigationComponent } from './components/time-navigation/time-navigation.component';
import { DayDetailComponent } from './components/day-detail/day-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardViewComponent,
      }
    ]),
    SharedModalModule,
  ],
  declarations: [DashboardViewComponent, TimeNavigationComponent, DayDetailComponent, ],
  providers: [MeetingsService],
})
export class CalendarFeaturesDashboardModule {}

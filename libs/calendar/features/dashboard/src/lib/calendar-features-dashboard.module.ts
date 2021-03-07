import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { TimeNavigationComponent } from './components/time-navigation/time-navigation.component';
import { DayBoxDetailComponent } from './components/day-box-detail/day-box-detail.component';
import { DayBoxBaseComponent } from './components/day-box-base/day-box-base.component';
import { RouterModule } from "@angular/router";

import { MeetingsService } from "../../../../api/src/lib/services/meetings/meetings.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardViewComponent,
      }
    ])
  ],
  declarations: [DashboardViewComponent, TimeNavigationComponent, DayBoxDetailComponent, DayBoxBaseComponent],
  providers: [MeetingsService],
})
export class CalendarFeaturesDashboardModule {}

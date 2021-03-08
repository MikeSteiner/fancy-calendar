import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { HomeViewComponent } from './home-view/home-view.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeViewComponent,
      }
    ]),
  ],
  declarations: [HomeViewComponent],
})
export class CalendarFeaturesHomeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarTypesModule } from '@fancy-calendar/calendar/types';

@NgModule({
  imports: [CommonModule, CalendarTypesModule],
})
export class CalendarDatesModule {}

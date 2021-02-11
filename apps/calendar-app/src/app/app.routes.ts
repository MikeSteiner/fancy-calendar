import { ExtraOptions, Routes } from '@angular/router';

import {AppComponent} from "./app.component";

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: AppComponent
  },
  {
    path: 'calendar',
    loadChildren: () => import('@fancy-calendar/calendar/features/dashboard').then((m) => m.CalendarFeaturesDashboardModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

export const APP_EXTRA_OPTIONS: ExtraOptions = { relativeLinkResolution: 'legacy' };

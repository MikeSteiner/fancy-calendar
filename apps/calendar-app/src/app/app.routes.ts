import { ExtraOptions, Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('@fancy-calendar/calendar/features/home').then((m) => m.CalendarFeaturesHomeModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('@fancy-calendar/calendar/features/calendar').then((m) => m.CalendarFeaturesCalendarModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

export const APP_EXTRA_OPTIONS: ExtraOptions = { relativeLinkResolution: 'legacy' };

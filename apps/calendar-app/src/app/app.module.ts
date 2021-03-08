import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {SharedViewModule} from '@fancy-calendar/shared/view';

import { AppComponent } from './app.component';
import {APP_ROUTES} from "./app.routes";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES, {initialNavigation: 'enabled'}),
    SharedViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

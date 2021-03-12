import { Injectable } from '@angular/core';
import { MeetingsService } from "@fancy-calendar/calendar/api";
import { BehaviorSubject, Observable } from 'rxjs';

import { Meeting } from '@fancy-calendar/calendar/types';
import { distinctUntilChanged, map } from "rxjs/operators";

@Injectable()
export class BaseStateService<T> {
  private _state$: BehaviorSubject<T>;

  protected get state() {
    return this._state$.getValue();
  }

  constructor(initialState: T) {
    this._state$ = new BehaviorSubject<T>(initialState);
  }

  protected select<K>(mapFn: (state: T) => K): Observable<K> {
    return this._state$.asObservable().pipe(
      map((state) => mapFn(state)),
      distinctUntilChanged()
    )
  }

  protected setState(newState: Partial<T>): void {
    this._state$.next({
      ...this.state,
      ...newState,
    })
  }
}

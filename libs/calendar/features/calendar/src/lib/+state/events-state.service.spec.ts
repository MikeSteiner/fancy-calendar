import { TestBed } from '@angular/core/testing';

import { EventsStateService } from './events-state.service';

describe('CalendarStateService', () => {
  let service: EventsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MeetingsStateService } from './meetings-state.service';

describe('MeetingsStateService', () => {
  let service: MeetingsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

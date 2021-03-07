import { TestBed } from '@angular/core/testing';

import { CalendarGeneratorService } from './calendar-generator.service';

describe('HelperFunctionsService', () => {
  let service: CalendarGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BaseStateService } from './base-state.service';

interface FakeState {
  loading: boolean;
  entities: string[];
}

describe('BaseStateService', () => {
  let service: BaseStateService<FakeState>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

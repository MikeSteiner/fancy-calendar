import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeNavigationComponent } from './time-navigation.component';

describe('TimeNavigationComponent', () => {
  let component: TimeNavigationComponent;
  let fixture: ComponentFixture<TimeNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

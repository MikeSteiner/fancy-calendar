import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMonthNavigationComponent } from './calendar-month-navigation.component';

describe('CalendarMonthNavigationComponent', () => {
  let component: CalendarMonthNavigationComponent;
  let fixture: ComponentFixture<CalendarMonthNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarMonthNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarMonthNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

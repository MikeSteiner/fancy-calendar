import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDaysOfWeekComponent } from './calendar-days-of-week.component';

describe('CalendarDaysOfWeekComponent', () => {
  let component: CalendarDaysOfWeekComponent;
  let fixture: ComponentFixture<CalendarDaysOfWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarDaysOfWeekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDaysOfWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

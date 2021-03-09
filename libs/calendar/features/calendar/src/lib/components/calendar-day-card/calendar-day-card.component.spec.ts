import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayCardComponent } from './calendar-day-card.component';

describe('CalendarDayCardComponent', () => {
  let component: CalendarDayCardComponent;
  let fixture: ComponentFixture<CalendarDayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarDayCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

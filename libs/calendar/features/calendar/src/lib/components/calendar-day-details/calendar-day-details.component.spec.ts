import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayDetailsComponent } from './calendar-day-details.component';

describe('CalendarDayDetailsComponent', () => {
  let component: CalendarDayDetailsComponent;
  let fixture: ComponentFixture<CalendarDayDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarDayDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDayDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

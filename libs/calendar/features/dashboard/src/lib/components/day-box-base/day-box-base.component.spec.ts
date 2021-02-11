import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayBoxBaseComponent } from './day-box-base.component';

describe('DayBoxBaseComponent', () => {
  let component: DayBoxBaseComponent;
  let fixture: ComponentFixture<DayBoxBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayBoxBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayBoxBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

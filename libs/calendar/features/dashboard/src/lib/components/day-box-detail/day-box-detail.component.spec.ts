import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayBoxDetailComponent } from './day-box-detail.component';

describe('DayBoxDetailComponent', () => {
  let component: DayBoxDetailComponent;
  let fixture: ComponentFixture<DayBoxDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayBoxDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayBoxDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

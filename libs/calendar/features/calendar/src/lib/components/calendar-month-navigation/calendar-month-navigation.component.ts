import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'fancy-calendar-calendar-month-navigation',
  templateUrl: './calendar-month-navigation.component.html',
  styleUrls: ['./calendar-month-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarMonthNavigationComponent implements OnInit {
  @Output() prev = new EventEmitter<boolean>();
  @Output() next = new EventEmitter<boolean>();
  @Output() today = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onPreviousClick(): void {
    this.prev.emit(true);
  }

  onNextClick(): void {
    this.next.emit(true);
  }

  onTodayClick(): void {
    this.today.emit(true);
  }
}

import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fancy-calendar-calendar-title',
  templateUrl: './calendar-title.component.html',
  styleUrls: ['./calendar-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarTitleComponent implements OnInit {
  @Input() displayDate: Date;
  @Input() locale: string;

  get title() {
    const options = { month: 'long', year: 'numeric'};
    return new Intl.DateTimeFormat(this.locale, options).format(this.displayDate);
  }

  constructor() { }

  ngOnInit(): void {
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Day, Meeting} from "@fancy-calendar/calendar/types";

@Component({
  selector: 'fancy-calendar-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.scss']
})
export class DayDetailComponent implements OnInit {
  @Input() day: Day;
  @Input() meetings: Meeting[];

  constructor() { }

  ngOnInit(): void {
  }

}

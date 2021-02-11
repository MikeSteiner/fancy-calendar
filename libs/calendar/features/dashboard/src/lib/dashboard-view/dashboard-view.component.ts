import { Component, OnInit } from '@angular/core';
import {MeetingsService} from "../service/meetings.service";
import {Observable} from "rxjs";

@Component({
  selector: 'fancy-calendar-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {

  meetings = this.meetingsService.getAll();;

  constructor(private meetingsService: MeetingsService) { }

  ngOnInit(): void {
    // this.meetings = this.meetingsService.getAll();
  }

}

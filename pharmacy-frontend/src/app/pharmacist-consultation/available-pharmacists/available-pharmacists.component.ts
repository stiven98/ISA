import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-available-pharmacists',
  templateUrl: './available-pharmacists.component.html',
  styleUrls: ['./available-pharmacists.component.css']
})
export class AvailablePharmacistsComponent implements OnInit {
  name: string;
  date;
  time;
  constructor(private route: ActivatedRoute) {
    this.name = route.snapshot.params[`name`];
    this.time = route.snapshot.params[`time`];
    this.date = route.snapshot.params[`date`];
  }

  ngOnInit(): void {

  }

}

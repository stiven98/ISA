import {Time} from '@angular/common';

export class FreeTermDTO {
  date;
  time;

  constructor() {
    this.date = new Date();
    this.time = null;
  }
}

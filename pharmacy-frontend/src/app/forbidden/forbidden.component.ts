import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {

  timeLeft: number = 5;
  interval;

startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 5;
      }
    },1000)
  }

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.startTimer();
    setTimeout(() => {
      this.router.navigate(['/login']);
  }, 5000);
  }

}

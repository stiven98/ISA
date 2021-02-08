import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExaminationService} from '../../services/examination.service';
import {Patient} from '../../shared/models/patient';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-available-pharmacists',
  templateUrl: './available-pharmacists.component.html',
  styleUrls: ['./available-pharmacists.component.css']
})
export class AvailablePharmacistsComponent implements OnInit {
  name: string;
  date;
  time;
  pharmacists = [];
  patient = new Patient();
  constructor(private route: ActivatedRoute, private examinationService: ExaminationService,
              private userService: UserService, private router: Router) {
    this.name = route.snapshot.params[`name`];
    this.time = route.snapshot.params[`time`];
    this.date = route.snapshot.params[`date`];
  }

  ngOnInit(): void {
    this.examinationService.getAvailablePharmacists(this.name).subscribe((pharmacists) => {
      this.pharmacists = pharmacists;
      this.userService.getMyInfo().subscribe(resUser => {
        this.patient = resUser;
      });
    });
    }
  sortPharmacists = () => {
    for (let i = 0; i < this.pharmacists.length - 1; i++ ) {
      for ( let j = 0; j < this.pharmacists.length - i - 1; j++ ) {
        if ( this.pharmacists[j].averageMark < this.pharmacists[j + 1].averageMark){
          const temp = this.pharmacists[j];
          this.pharmacists[j] = this.pharmacists[j + 1];
          this.pharmacists[j + 1] = temp;
        }
      }
    }
  }
  scheduleConsulations = (pharmacist) => {
    this.examinationService.scheduleNewConsulations(pharmacist.userId, this.name, this.date, this.time, this.patient.email).subscribe();
    alert('Pharmacist consulations successfully scheduled');
    this.router.navigate(['/patient']);
  }
}

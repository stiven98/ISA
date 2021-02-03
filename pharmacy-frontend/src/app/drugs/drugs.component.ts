import { Component, OnInit } from '@angular/core';
import {Drug} from '../shared/models/drug';
import {DrugService} from '../services/drug.service';
import {Patient} from '../shared/models/patient';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css']
})
export class DrugsComponent implements OnInit {

  drugs: Drug [];
  currentUser = new Patient();

  constructor(private drugService: DrugService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.drugService.findAll().subscribe((drug) => {
      this.drugs = drug;
    });
  }
}

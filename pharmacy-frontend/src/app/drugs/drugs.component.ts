import { Component, OnInit } from '@angular/core';
import {DrugService} from '../services/drug.service';
import {Drug} from '../shared/models/drug';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css']
})
export class DrugsComponent implements OnInit {

  drugs: Drug [];

  constructor(private drugService: DrugService) {
  }

  ngOnInit(): void {
    this.drugService.findAll().subscribe((drug) => {
      this.drugs = drug;
    });
  }
}

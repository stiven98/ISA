import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  makrs = {
    pharmacyName: '',
    averageMarkPharmacy: 0,
    employeeDTOS : []
  }
  fetchData = false;

  constructor(private reportsService:ReportsService) { }

  ngOnInit(): void {
    this.fetchData = true;
    this.reportsService.getReportMarks().subscribe((res) => this.makrs = res );
   

    this.fetchData = false;
  }


  condition(derm){
    return derm.employeeType == 'Dermatologist';
  }



}

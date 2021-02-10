import { Component, OnInit } from '@angular/core';
import { VacationService } from '../services/vacation.service';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {

  fetchData = false;
  list = []
  constructor(private vacationService:VacationService) { }

  ngOnInit(): void {

    if(localStorage.getItem('role') == 'ROLE_PH_ADMIN')
      this.vacationService.getAllPharmacistRequest().subscribe((res)=> {this.list = res;
      for(let a of this.list){  
        a.startDate = new Date(a.startDate).toLocaleDateString();
        a.endDate = new Date(a.endDate).toLocaleDateString();
      }
      
      });
    
    if(localStorage.getItem('role') == 'ROLE_SYSTEM_ADMINISTRATOR')
      alert("cao");
  }



  accept(v){
    alert("prihvaio");
  }


  decline(v){
    alert("Odbio");

  }



}

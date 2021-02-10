import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VacationService } from '../services/vacation.service';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {

  fetchData = false;
  list = []
  closeResult = '';
  constructor(private vacationService:VacationService, private modalService:NgbModal) { }

  ngOnInit(): void {

    if(localStorage.getItem('role') == 'ROLE_PH_ADMIN')
      this.vacationService.getAllPharmacistRequest().subscribe((res)=> {this.list = res;
      for(let a of this.list){  
        a.startDate = new Date(a.startDate).toLocaleDateString();
        a.endDate = new Date(a.endDate).toLocaleDateString();
      }
      
      });
    
    if(localStorage.getItem('role') == 'ROLE_SYSTEM_ADMINISTRATOR')
      this.vacationService.getAllDermatologistRequest().subscribe((res)=> {this.list = res;
        for(let a of this.list){  
          a.startDate = new Date(a.startDate).toLocaleDateString();
          a.endDate = new Date(a.endDate).toLocaleDateString();
        }
        
        });






  }



  accept(v){
    let dto ={
      vacationId: v.vacationId,
      email: v.email,
      startDate: new Date(),
      endDate: new Date(),
      status: "created",
      note: v.note
    }
    this.vacationService.approveVacation(dto).subscribe((res)=> alert(res.result));
    

  }


  decline(v){
    let dto ={
      vacationId: v.vacationId,
      email: v.email,
      startDate: new Date(),
      endDate: new Date(),
      status: "created",
      note: v.note
    }

    this.vacationService.declineVacation(dto).subscribe((res)=> alert(res.result));

  }



  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }


}

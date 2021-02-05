import { Component, OnInit } from '@angular/core';
import { MedicalStuffService } from '../services/medical-stuff.service';
import { UserService } from '../services/user.service';
import { EmployeesSearchModel } from '../shared/models/EmployeesSearch';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-see-all-pharmacist',
  templateUrl: './see-all-pharmacist.component.html',
  styleUrls: ['./see-all-pharmacist.component.css']
})
export class SeeAllPharmacistComponent implements OnInit {
  fetchData = false;
  dermatologist = []
  list = [];
  role = true;
  filter = [];
  pharmacyName:String;
  cityName:String;
  averageMark:number= 0;
  closeResult = '';
  search:EmployeesSearchModel = new EmployeesSearchModel();

  constructor(private medicalStuffService:MedicalStuffService, private modalService:NgbModal, 
    private userService:UserService ) { }

  ngOnInit(): void {
    this.fetchData = true;
    this.search.role =  localStorage.getItem('role');
    if( localStorage.getItem('role') == 'ROLE_PATIENT'){
      this.medicalStuffService.getAllPharmacist().subscribe((list)=> {this.dermatologist = list;
      this.list = list;
      });
    }
    if( localStorage.getItem('role') == 'ROLE_PH_ADMIN'){
      this.userService.getMyInfo().subscribe((user) => {
        this.search.email = user.email;
        this.medicalStuffService.getAllPharmacistFromPharmacy(user.email).subscribe((list)=> {this.dermatologist = list;
          this.list = list;
          this.role = false;
        });
      });
    }
    this.fetchData = false;
  }


  searchPharmacist(){
    this.fetchData = true;
    this.medicalStuffService.searchPharmacist(this.search).subscribe((list)=> {this.dermatologist = list; 
      this.fetchData = false;
      if(this.dermatologist.length == 0){
        alert("No dermatogolist with search parametars");
        this.dermatologist = this.list;
      }});
  }


  filterByMark(event){
    this.pharmacyName= '';
    this.cityName = '';
    this.filter = [];
    for(let d of this.list){
      for(let ph of d.pharmacies){
        if(ph.averageMarke > this.averageMark){
          if(!this.filter.includes(d))
            this.filter.push(d);
        }
      }
    }
    if(this.pharmacyName !='')
      this.dermatologist = this.filter;
    else
      this.dermatologist = this.list;


  }

  filterByName(event){
    this.averageMark= 0;
    this.cityName = '';
    this.filter = [];
    for(let d of this.list){
      for(let ph of d.pharmacies){
        if(ph.name.includes(this.pharmacyName)){
          if(!this.filter.includes(d))
            this.filter.push(d);
        }
      }
    }
    if(this.pharmacyName !='')
      this.dermatologist = this.filter;
    else
      this.dermatologist = this.list;
  }

  filterByCityName(event){
    this.pharmacyName= '';
    this.averageMark = 0;
    this.filter = [];
    for(let d of this.list){
      for(let ph of d.pharmacies){
        if(ph.cityName.includes(this.cityName)){
          if(!this.filter.includes(d))
            this.filter.push(d);
        }
      }
    }
    if(this.cityName != '')
      this.dermatologist = this.filter;
    else
      this.dermatologist = this.list;
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

}

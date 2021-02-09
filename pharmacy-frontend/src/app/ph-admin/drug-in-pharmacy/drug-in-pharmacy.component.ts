import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DrugPriceService } from 'src/app/services/drug-price.service';
import { ChangeUserModel } from '../../change-account-info/changeUser.model';
import { DrugOrderModel } from '../../drug-order/drugOrderModel';
import { DrugInPharmacyService } from '../../services/drug-in-pharmacy.service';
import { DrugOrderService } from '../../services/drug-order.service';
import { UserService } from '../../services/user.service';
import { DrugInpharmacyChangeModel } from './drugInPharmacyModel';
import { DrugPriceModel } from './drugPriceModel';
import { SearchDrugModel } from './searchDrugModel';

@Component({
  selector: 'app-drug-in-pharmacy',
  templateUrl: './drug-in-pharmacy.component.html',
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})
export class DrugInPharmacyComponent implements OnInit {
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  fetchData = false;
  drugList = [];
  user:ChangeUserModel = new ChangeUserModel();
  drugInPharmacy: DrugOrderModel = new DrugOrderModel();
  drugChanges:DrugInpharmacyChangeModel = new DrugInpharmacyChangeModel();
  serachDrug:SearchDrugModel = new SearchDrugModel();
  flag = false;
  drugPrice:DrugPriceModel = new DrugPriceModel();
  closeResult = '';
  constructor( private drugOrderSerivice: DrugOrderService, private userService:UserService,
     private drugInPharmacyService:DrugInPharmacyService,
     private modalService:NgbModal,
     private calendar: NgbCalendar,
     private drugPriceServ: DrugPriceService) { 
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

     }

  ngOnInit(): void {
    this.fetchData = true;
    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
    this.drugOrderSerivice.getDrugList().subscribe(drug => this.drugList = drug);
    this.userService.getMyInfo().subscribe(user => {this.user = user; this.drugInPharmacy.pharmacyAdminEmail = this.user.email;
      this.drugInPharmacyService.getDrugInPharmacy(this.user.email).subscribe(list => {this.drugInPharmacy.drugOrderItems = list;})
    }  
      );
    this.fetchData = false;
  }


  addDrugInPharmacy(drug){
    var flag = true;
    for(let a of this.drugInPharmacy.drugOrderItems){
      if(drug.id == a.id){
        flag = false;
        break;
      }
    }
    this.drugChanges.pharmacyAdminEmail=this.drugInPharmacy.pharmacyAdminEmail;
    this.drugChanges.drugId = drug.id;
    this.drugChanges.quantity = 0;

    if(flag){
      this.drugInPharmacy.drugOrderItems.push(drug);
      this.drugInPharmacyService.addDrugInPharmacy(this.drugChanges).subscribe((response)=> {alert("Succesfuly add drug in pharmacy")})
    }else{
      alert("This drug already exist in pharmacy");
    }
  }

  removeDrugFromPharmacy(drug){
    this.drugInPharmacy.drugOrderItems = this.drugInPharmacy.drugOrderItems.filter(obj => obj !== drug);
    this.drugChanges.pharmacyAdminEmail=this.drugInPharmacy.pharmacyAdminEmail;
    this.drugChanges.drugId = drug.id;
    this.drugChanges.quantity = 0;
    this.drugInPharmacyService.removeDrugInPharmacy(this.drugChanges).subscribe((response)=> {alert(response)})
    alert("Succesfuly remove drug from pharmacy");
  }

  changeQuantity(drug){
    this.drugInPharmacy.drugOrderItems = this.drugInPharmacy.drugOrderItems.filter(obj => obj !== drug);
    this.drugChanges.pharmacyAdminEmail=this.drugInPharmacy.pharmacyAdminEmail;
    this.drugChanges.drugId = drug.id;
    this.drugChanges.quantity = 0;
    this.drugInPharmacyService.removeDrugInPharmacy(this.drugChanges).subscribe((response)=> {alert(response)})
    alert("Succesfuly remove drug from pharmacy");
  }


  change(){
    this.flag = !this.flag;
  }

  update(drug){
    this.flag = !this.flag;
    this.drugChanges.pharmacyAdminEmail=this.drugInPharmacy.pharmacyAdminEmail;
    this.drugChanges.drugId = drug.id;
    this.drugChanges.quantity = drug.quantity;
    this.drugInPharmacyService.updateDrugInPharmacy(this.drugChanges).subscribe((response)=> {alert(response)})
  }

  search(){
    this.fetchData = true;
    this.serachDrug.phAdminEmail = this.drugInPharmacy.pharmacyAdminEmail;
    this.drugInPharmacyService.searhcDrugInPharmacy(this.serachDrug).subscribe((list) => { this.drugInPharmacy.drugOrderItems = list; 
      this.serachDrug = new SearchDrugModel(); });
    this.fetchData = false;
  }



  createDrugPrice(drug){
    this.drugPrice.idDrug = drug.id;
    if(this.fromDate != undefined){
      let d = this.fromDate.year + "-" + this.fromDate.month + "-" + this.fromDate.day;
      this.drugPrice.startDate = new Date(Date.parse(d));
    }else{
      alert("Choose day");
      return;
    }

    if(this.toDate != undefined){
      let d = this.toDate.year + "-" + this.toDate.month + "-" + this.toDate.day;
      this.drugPrice.endDate = new Date(Date.parse(d));
    }else{
      alert("Choose day");
      return;
    }



    this.drugPriceServ.createDrugPrice(this.drugPrice).subscribe(
      (res) => { alert(res.result) }
    );

  }




  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }





  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

}

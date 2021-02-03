import { Component, OnInit } from '@angular/core';
import { ChangeUserModel } from '../../change-account-info/changeUser.model';
import { DrugOrderModel } from '../../drug-order/drugOrderModel';
import { DrugInPharmacyService } from '../../services/drug-in-pharmacy.service';
import { DrugOrderService } from '../../services/drug-order.service';
import { UserService } from '../../services/user.service';
import { DrugInpharmacyChangeModel } from './drugInPharmacyModel';
import { SearchDrugModel } from './searchDrugModel';

@Component({
  selector: 'app-drug-in-pharmacy',
  templateUrl: './drug-in-pharmacy.component.html',
  styleUrls: ['./drug-in-pharmacy.component.css']
})
export class DrugInPharmacyComponent implements OnInit {

  fetchData = false;
  drugList = [];
  user:ChangeUserModel = new ChangeUserModel();
  drugInPharmacy: DrugOrderModel = new DrugOrderModel();
  drugChanges:DrugInpharmacyChangeModel = new DrugInpharmacyChangeModel();
  serachDrug:SearchDrugModel = new SearchDrugModel();
  flag = false;

  constructor( private drugOrderSerivice: DrugOrderService, private userService:UserService,
     private drugInPharmacyService:DrugInPharmacyService) { }

  ngOnInit(): void {
    this.fetchData = true;
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
    alert("cao");
    this.drugInPharmacyService.updateDrugInPharmacy(this.drugChanges).subscribe((response)=> {alert(response)})
  }

  search(){
    this.fetchData = true;
    this.serachDrug.phAdminEmail = this.drugInPharmacy.pharmacyAdminEmail;
    this.drugInPharmacyService.searhcDrugInPharmacy(this.serachDrug).subscribe((list) => { this.drugInPharmacy.drugOrderItems = list; 
      this.serachDrug = new SearchDrugModel(); });
    this.fetchData = false;
  }



}

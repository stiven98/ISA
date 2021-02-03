import { Component, OnInit } from '@angular/core';
import { ChangeUserModel } from '../change-account-info/changeUser.model';
import { DrugOrderService } from '../services/drug-order.service';
import { UserService } from '../services/user.service';
import { DrugOrderModel } from './drugOrderModel';

@Component({
  selector: 'app-drug-order',
  templateUrl: './drug-order.component.html',
  styleUrls: ['./drug-order.component.css']
})
export class DrugOrderComponent implements OnInit {

  logUser: ChangeUserModel = new ChangeUserModel();
  fetchData = false;
  drugList = [];
  drugOrder:DrugOrderModel = new DrugOrderModel();
  constructor(private userService:UserService, private drugOrderSerivice: DrugOrderService) { }

  ngOnInit(): void {
    this.fetchData = true;
    this.userService.getMyInfo().subscribe(user => this.logUser=user);
    this.drugOrderSerivice.getDrugList().subscribe(drug=> this.drugList = drug);
    this.fetchData = false;
  }



  addInOrder(drug){
    if(drug.quantity > 0){
      this.drugOrder.drugOrderItems.push(drug);
      this.drugList = this.drugList.filter(obj => obj !== drug);
    }else
      alert("Bad input qunatity");
  }

  remove(drug){
    drug.quantity = 0;
    this.drugList.push(drug);
    this.drugOrder.drugOrderItems = this.drugOrder.drugOrderItems.filter(obj => obj !== drug);
  }

  createOrder(){
    this.drugOrder.pharmacyAdminEmail = this.logUser.email;
    this.drugOrderSerivice.createOrder(this.drugOrder).subscribe(() => {
      alert("Succesful create order");
    },
    err => { alert(err);});
  }



}

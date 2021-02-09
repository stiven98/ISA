import { Component, OnInit } from '@angular/core';
import { ChangeUserModel } from '../change-account-info/changeUser.model';
import { DrugPriceService } from '../services/drug-price.service';
import { MedicalStuffService } from '../services/medical-stuff.service';
import { UserService } from '../services/user.service';
import { DrugPriceModel } from './drug-in-pharmacy/drugPriceModel';

@Component({
  selector: 'app-ph-admin',
  templateUrl: './ph-admin.component.html',
  styleUrls: ['./ph-admin.component.css']
})
export class PhAdminComponent implements OnInit {

  phAdmin: ChangeUserModel = new ChangeUserModel();
  fetchData = false;
  dermatologist = []
  drugPrice = [];
  f = false;
  change = false;
  constructor(private userService: UserService, private medicalStufService:MedicalStuffService,
    private drugPriceServise: DrugPriceService) { }

  ngOnInit(): void {
    this.fetchData = true;
    this.userService.getMyInfo().subscribe(phAdmin =>{ this.phAdmin = phAdmin
    this.medicalStufService.getAllDermatologistFromPharmacy(this.phAdmin.email).subscribe((list) => {
      this.dermatologist = list;
    })
    });

    this.drugPriceServise.getAllForChange().subscribe((res) => {this.drugPrice = res;
      for(let a of this.drugPrice){  
        a.startDate = new Date(a.startDate).toLocaleDateString();
        a.endDate = new Date(a.endDate).toLocaleDateString();
      }
    
    });

    this.fetchData = false;
  }

  flag(){
    this.f = true;
  }

  changPrice(){
    this.change = true;
  }

  save(dp){
    let d = new DrugPriceModel();
    d.drugPrice = dp.drugPrice;
    d.price = dp.price;

    let dto = {
      price:dp.price,
      drugPrice:dp.drugPrice
    }


    alert(d.price);
    alert(d.drugPrice);

    this.drugPriceServise.changeDrugPirce(dto).subscribe((res)=> alert(res.result));

  }




}

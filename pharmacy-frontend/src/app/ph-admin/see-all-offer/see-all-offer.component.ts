import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChangeUserModel } from '../../change-account-info/changeUser.model';
import { DrugOrderService } from '../../services/drug-order.service';
import { OfferService } from '../../services/offer.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-see-all-offer',
  templateUrl: './see-all-offer.component.html',
  styleUrls: ['./see-all-offer.component.css']
})
export class SeeAllOfferComponent implements OnInit {

  offer = []
  user:ChangeUserModel = new ChangeUserModel();
  fetchData = false;
  delete = true;


  constructor(private route: ActivatedRoute, private oferService: OfferService, private userService: UserService, private drugOrderService:DrugOrderService) {
   }

  ngOnInit(): void {
    this.fetchData = true;
    this.oferService.getAllByDrugOrderId(this.route.snapshot.params['id']).subscribe((res) =>{this.offer = res
      if(this.offer.length == 0)
        this.delete = false;

      for(let a of this.offer){  
        a.deadline = new Date(a.deadline).toLocaleDateString();
      }
    
    });
    this.userService.getMyInfo().subscribe((res) => this.user = res);

    this.fetchData = false;
  }


  accept(ofer){
    let a = {
      offerId: ofer.offerId,
      drugOrderId: ofer.drugOrderId,
      emailSuplier:ofer.emailSuplier,
      price: ofer.price,
      deadline: new Date(),
      phAdminEmail: ofer.phAdminEmail
    }
    this.fetchData = true;
    this.oferService.acceptOfer(a).subscribe((res) => {alert(res.result)
      this.fetchData = false;
    }, error => {
      alert(error.resul);
      this.fetchData = false;
    });
  }



  deleted(){
    this.route.snapshot.params['id']

    this.drugOrderService.deleteDrugOrder(this.route.snapshot.params['id']).subscribe((res) => 
      alert(res.result)
    )

  }




}

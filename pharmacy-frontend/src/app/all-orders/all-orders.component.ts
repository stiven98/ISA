import { Component, OnInit } from '@angular/core';
import {DrugOrderService} from '../services/drug-order.service';
import {PharmacyService} from '../services/pharmacy.service';
import {timeout} from 'rxjs/operators';
import {OfferValidation} from '../validation-model/offer-validation';
import {OfferService} from '../services/offer.service';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  orders = [];
  email = '';

  constructor(private drugOrderService: DrugOrderService,
              private pharmacyService: PharmacyService,
              private offerService: OfferService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.drugOrderService.getAllOrders().subscribe((response) => {
      for (const item of response) {
        if (new Date().getTime() <= new Date(item.deadline).getTime()) {
          this.pharmacyService.findById(item.pharmacy).subscribe(answer => {
            this.orders.push({...item, pharmacyObject: answer, offerValidation: new OfferValidation(), price: '', deliveryTime: new Date()});
          });
        }
      }
    });

    this.userService.getMyInfo().subscribe((response) => {
      this.email = response.email;
      console.log(this.email);
    });

  }

  getDate = (limit) => {
    return new Date(limit).toDateString();
  }

  createOffer = (item) => {
    const validatedPrice = item.offerValidation.isValidPrice(item.price);
    const validatedDeliveryTime = item.offerValidation.isValidDeliveryTime(item.deliveryTime, item.deadline);

    if (validatedPrice && validatedDeliveryTime) {
      this.offerService.saveOffer({...item, email: this.email}).subscribe(response => {
        alert('Offer success created!');
        this.router.navigate(['myOffers']);
      }, error => {
        alert('Error!');
      });
    }
  }

}

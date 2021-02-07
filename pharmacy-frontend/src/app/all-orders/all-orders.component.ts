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

  orders: any [];
  email: string;

  constructor(private drugOrderService: DrugOrderService,
              private pharmacyService: PharmacyService,
              private offerService: OfferService,
              private userService: UserService,
              private router: Router,
              private authService: AuthService
              ) { }

  ngOnInit(): void {
    this.orders = [];
    this.email = '';
    this.userService.getMyInfo().subscribe((user) => {
      this.email = user.email;
      if (this.authService.getRole() === 'ROLE_SUPPLIER') {
        this.drugOrderService.getAllOrders(this.email).subscribe((response) => {
          for (const item of response) {
            if (new Date().getTime() <= new Date(item.deadline).getTime()) {
              this.pharmacyService.findById(item.pharmacy).subscribe(answer => {
                this.orders.push({
                  ...item,
                  pharmacyObject: answer,
                  offerValidation: new OfferValidation(),
                  price: '',
                  deliveryTime: new Date()
                });
              });
            }
          }
        });

      } else {
        this.router.navigate(['403']);
      }
    }, error => {
      this.router.navigate(['login']);
    });



  }

  getDate = (limit) => {
    return new Date(limit).toDateString();
  }

  createOffer = (item) => {
    const validatedPrice = item.offerValidation.isValidPrice(item.price);
    const validatedDeliveryTime = item.offerValidation.isValidDeliveryTime(item.deliveryTime, item.deadline);

    if (validatedPrice && validatedDeliveryTime) {
      const ids = item.drugOrderItems.map(drug => {
        return drug.itemId;
      });

      this.offerService.saveOffer({...item, email: this.email, ids}).subscribe(response => {
        alert('Offer success created!');
        this.router.navigate(['myOffers']);
      }, error => {
        alert('Error!');
      });
    }
  }

}

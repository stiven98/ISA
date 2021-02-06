import { Component, OnInit } from '@angular/core';
import {OfferService} from '../services/offer.service';
import {UserService} from '../services/user.service';
import {OfferValidation} from '../validation-model/offer-validation';
import {PharmacyService} from '../services/pharmacy.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

  offers: any [];
  offerValidation: OfferValidation;

  constructor(private offerService: OfferService,
              private userService: UserService,
              private pharmacyService: PharmacyService,
              private router: Router) { }

  ngOnInit(): void {
    this.offers = [];
    this.offerValidation = new OfferValidation();
    this.userService.getMyInfo().subscribe((user) => {
      this.offerService.findAll(user.email).subscribe((response) => {
        for (const item of response ) {
          this.pharmacyService.findById(item.drugOrder.pharmacy).subscribe(answer => {
            this.offers.push({...item, pharmacyObject: answer, newPrice: ''});
          });
        }
      });
    }, error => {
      this.router.navigate(['login']);
    });
  }

  getDate = (deadline) => {
    return new Date(deadline).toDateString();
  }

  changePrice = (item) => {
    const validatedPrice = this.offerValidation.isValidPrice(item.newPrice);
    if (validatedPrice) {
      this.offerService.updateOffer(item.offerId, item.newPrice).subscribe(response => {
        this.ngOnInit();
      });
    }

  }
}

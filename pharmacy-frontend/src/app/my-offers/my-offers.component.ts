import { Component, OnInit } from '@angular/core';
import {OfferService} from '../services/offer.service';
import {UserService} from '../services/user.service';
import {OfferValidation} from '../validation-model/offer-validation';
import {PharmacyService} from '../services/pharmacy.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

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
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.offers = [];
    this.offerValidation = new OfferValidation();
    this.userService.getMyInfo().subscribe((user) => {
      if (this.authService.getRole() === 'ROLE_SUPPLIER') {

        this.offerService.findAll(user.email).subscribe((response) => {
          for (const item of response) {
            this.pharmacyService.findById(item.drugOrder.pharmacy).subscribe(answer => {
              this.offers.push({...item, pharmacyObject: answer, newPrice: ''});
              console.log(this.offers);

            });
          }
        });
      }
    }, error => {
      this.router.navigate(['login']);
    });
  }

  canChange = (mil) => {
    return new Date().getTime() < new Date(mil).getTime();
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

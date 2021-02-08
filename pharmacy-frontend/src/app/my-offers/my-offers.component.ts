import { Component, OnInit } from '@angular/core';
import {OfferService} from '../services/offer.service';
import {UserService} from '../services/user.service';
import {OfferValidation} from '../validation-model/offer-validation';
import {PharmacyService} from '../services/pharmacy.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {fakeAsync} from '@angular/core/testing';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {
  showOffers: any [];
  offers: any [];
  offerValidation: OfferValidation;
  waitingChecked: boolean;
  acceptedChecked: boolean;
  declinedChecked: boolean;
  filtering: boolean;

  constructor(private offerService: OfferService,
              private userService: UserService,
              private pharmacyService: PharmacyService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.waitingChecked = true;
    this.acceptedChecked = true;
    this.declinedChecked = true;
    this.filtering = false;
    this.offers = [];
    this.showOffers = [];
    this.offerValidation = new OfferValidation();
    this.userService.getMyInfo().subscribe((user) => {
      if (this.authService.getRole() === 'ROLE_SUPPLIER') {

        this.offerService.findAll(user.email).subscribe((response) => {
          for (const item of response) {
            this.pharmacyService.findById(item.drugOrder.pharmacy).subscribe(answer => {
              this.offers.push({...item, pharmacyObject: answer, newPrice: ''});
              this.showOffers.push({...item, pharmacyObject: answer, newPrice: ''});
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

  onChangeCheckBox = () => {
    this.filtering = true;
    this.showOffers = [];
    for (const offer of this.offers) {
      if (this.isAccepted(offer) || this.isDeclined(offer) || this.onWaiting(offer)) {
        this.showOffers.push(offer);
      }
    }
    this.filtering = false;

  }

  isAccepted = (offer) => {
    return (this.acceptedChecked && (offer.status === 'accepted'));
  }

  isDeclined = (offer) => {
    return (this.declinedChecked && (offer.status === 'declined'));
  }

  onWaiting = (offer) => {
    return (this.waitingChecked && (offer.status === 'waiting'));
  }
}

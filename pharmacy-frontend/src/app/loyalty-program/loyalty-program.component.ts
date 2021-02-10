import { Component, OnInit } from '@angular/core';
import {LoyaltyProgramService} from '../services/loyalty-program.service';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {LoyaltyProgramModel} from '../my-offers/loyalty-program.model';
import {LoyaltyProgramValidation} from '../validation-model/loyalty-program.validation';

@Component({
  selector: 'app-loyalty-program',
  templateUrl: './loyalty-program.component.html',
  styleUrls: ['./loyalty-program.component.css']
})
export class LoyaltyProgramComponent implements OnInit {

  loyaltyProgramModel: LoyaltyProgramModel;
  mode: boolean;
  loyaltyProgramValidation: LoyaltyProgramValidation;

  constructor(private loyaltyProgramService: LoyaltyProgramService,
              private userService: UserService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.loyaltyProgramValidation = new LoyaltyProgramValidation();
    this.mode = false;
    this.loyaltyProgramModel = new LoyaltyProgramModel();
    this.userService.getMyInfo().subscribe(response => {
      if (this.authService.getRole() === 'ROLE_SYSTEM_ADMINISTRATOR') {
        this.loyaltyProgramService.getLoyaltyProgram().subscribe(loyaltyProgram  => {
          this.loyaltyProgramModel.translate(loyaltyProgram);
        });
      } else {
        this.router.navigate(['403']);
      }
    }, () => {
      this.router.navigate(['login']);
    });

  }

  onChange = () => {
    this.mode = true;
  }

  onCancel = () => {
    this.ngOnInit();
  }

  onSave = () => {
    const validatedMinRegular = this.loyaltyProgramValidation.isValidMinRegular(this.loyaltyProgramModel.minRegular);
    const validatedMinSilver = this.loyaltyProgramValidation.isValidMinSilver(this.loyaltyProgramModel.minSilver);
    const validatedMinGold = this.loyaltyProgramValidation.isValidMinGold(this.loyaltyProgramModel.minGold);
    const validatedPointsPerExamination = this.loyaltyProgramValidation
      .isValidPointsPerExamination(this.loyaltyProgramModel.pointsPerExamination);
    const validatedPointsPerCounseling = this.loyaltyProgramValidation
      .isValidPointsPerCounseling(this.loyaltyProgramModel.pointsPerCounseling);
    const validatedDiscountForRegular = this.loyaltyProgramValidation
      .isValidDiscountForRegular(this.loyaltyProgramModel.discountForRegular);
    const validatedDiscountForSilver = this.loyaltyProgramValidation.isValidDiscountForSilver(this.loyaltyProgramModel.discountForSilver);
    const validatedDiscountForGold = this.loyaltyProgramValidation.isValidDiscountForGold(this.loyaltyProgramModel.discountForGold);

    if (validatedMinGold && validatedMinSilver && validatedMinRegular && validatedPointsPerExamination && validatedPointsPerCounseling &&
    validatedDiscountForRegular && validatedDiscountForSilver && validatedDiscountForGold) {
      this.loyaltyProgramService.updateLoyaltyProgram(this.loyaltyProgramModel).subscribe(() => {
        this.ngOnInit();
      });
    }
  }






}

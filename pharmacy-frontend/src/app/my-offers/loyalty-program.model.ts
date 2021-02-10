

export class LoyaltyProgramModel {
  id: string;
  minRegular: number;
  minSilver: number;
  minGold: number;
  pointsPerExamination: number;
  pointsPerCounseling: number;
  discountForRegular: number;
  discountForSilver: number;
  discountForGold: number;

  constructor() {
  }


  translate = (object: any) => {
    this.id = object.id;
    this.minRegular = object.minRegular;
    this.minSilver = object.minSilver;
    this.minGold = object.minGold;
    this.pointsPerCounseling = object.pointsPerCounseling;
    this.pointsPerExamination = object.pointsPerExamination;
    this.discountForRegular = object.discountForRegular;
    this.discountForSilver = object.discountForSilver;
    this.discountForGold = object.discountForGold;
  }
}




export class LoyaltyProgramValidation {
  validMinRegular: string;
  validMinSilver: string;
  validMinGold: string;
  validPointsPerExamination: string;
  validPointsPerCounseling: string;
  validDiscountForRegular: string;
  validDiscountForSilver: string;
  validDiscountForGold: string;

  constructor() {
    this.validMinRegular = 'no-validate';
    this.validMinSilver = 'no-validate';
    this.validMinGold = 'no-validate';
    this.validPointsPerExamination = 'no-validate';
    this.validPointsPerCounseling = 'no-validate';
    this.validDiscountForRegular = 'no-validate';
    this.validDiscountForSilver = 'no-validate';
    this.validDiscountForGold = 'no-validate';
  }

  isValidMinRegular = (num) => {
    if (isNaN(num) || num === '') {
      this.validMinRegular = 'is-invalid';
      return false;
    } else {
      this.validMinRegular = 'is-valid';
      return true;
    }
  }

  isValidMinSilver = (num) => {
    if (isNaN(num) || num === '') {
      this.validMinSilver = 'is-invalid';
      return false;
    } else {
      this.validMinSilver = 'is-valid';
      return true;
    }
  }

  isValidMinGold = (num) => {
    if (isNaN(num) || num === '') {
      this.validMinGold = 'is-invalid';
      return false;
    } else {
      this.validMinGold = 'is-valid';
      return true;
    }
  }

  isValidPointsPerExamination = (num) => {
    if (isNaN(num) || num === '') {
      this.validPointsPerExamination = 'is-invalid';
      return false;
    } else {
      this.validPointsPerExamination = 'is-valid';
      return true;
    }
  }

  isValidPointsPerCounseling = (num) => {
    if (isNaN(num) || num === '') {
      this.validPointsPerCounseling = 'is-invalid';
      return false;
    } else {
      this.validPointsPerCounseling = 'is-valid';
      return true;
    }
  }

  isValidDiscountForRegular = (num) => {
    if (isNaN(num) || num === '') {
      this.validDiscountForRegular = 'is-invalid';
      return false;
    } else {
      this.validDiscountForRegular = 'is-valid';
      return true;
    }
  }

  isValidDiscountForSilver = (num) => {
    if (isNaN(num) || num === '') {
      this.validDiscountForSilver = 'is-invalid';
      return false;
    } else {
      this.validDiscountForSilver = 'is-valid';
      return true;
    }
  }

  isValidDiscountForGold = (num) => {
    if (isNaN(num) || num === '') {
      this.validDiscountForGold = 'is-invalid';
      return false;
    } else {
      this.validDiscountForGold = 'is-valid';
      return true;
    }
  }
}

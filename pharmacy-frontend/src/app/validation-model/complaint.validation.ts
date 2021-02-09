

export class ComplaintValidation {
  validForWho: string;
  validContent: string;
  validPharmacy: string;
  validMedicalStuff: string;

  constructor() {
    this.validForWho = 'no-validate';
    this.validContent = 'no-validate';
    this.validPharmacy = 'no-validate';
    this.validMedicalStuff = 'no-validate';
  }
}

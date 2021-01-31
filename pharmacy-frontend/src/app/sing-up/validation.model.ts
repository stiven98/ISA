export class ValidationModel {

  validLocation: string;
  validConfirmPassword: string;
  validPassword: string;
  validEmail: string;
  validSurname: string;
  validName: string;
  validPhoneNumber: string;
  validCity: string;
  validCountry: string;
  validZipCode: string;
  validAddress: string;
  validNumber: string;
  validInputCountry: string;
  validInputCity: string;

  constructor() {
    this.validName = 'no-validate';
    this.validSurname = 'no-validate';
    this.validEmail = 'no-validate';
    this.validPassword = 'no-validate';
    this.validConfirmPassword = 'no-validate';
    this.validLocation = 'no-validate';
    this.validPhoneNumber = 'no-validate';
    this.validAddress = 'no-validate';
    this.validNumber = 'no-validate';
    this.validCountry = 'no-validate';
    this.validCity = 'no-validate';
    this.validZipCode = 'no-validate';
    this.validInputCountry = 'no-validate';
    this.validInputCity = 'no-validate';
  }
}

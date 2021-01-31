export class ValidationModel {

  validLocation: string;
  validConfirmPassword: string;
  validPassword: string;
  validEmail: string;
  validSurname: string;
  validName: string;

  constructor() {
    this.validName = 'no-validate';
    this.validSurname = 'no-validate';
    this.validEmail = 'no-validate';
    this.validPassword = 'no-validate';
    this.validConfirmPassword = 'no-validate';
    this.validLocation = 'no-validate';
  }
}

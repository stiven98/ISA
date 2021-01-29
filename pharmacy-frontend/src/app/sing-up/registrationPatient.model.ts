

export class RegistrationPatientModel {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  city: string;
  location: string;

  constructor() {
    this.name = '';
    this.surname = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.country = '';
    this.city = '';
    this.location = '';
  }



}

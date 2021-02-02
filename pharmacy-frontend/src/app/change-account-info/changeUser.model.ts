
export class ChangeUserModel {
    email: string;
    password: string;
    cityName: string;
    countryName: string;
    zipCode: number;
    street: string;
    streetNumber: number;
    name: string;
    lastName: string;
    phoneNumber: string;
    firstLogin: boolean;
    role: string;

    constructor() {
      this.name = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.street = '';
      this.streetNumber = 0;
      this.zipCode = 0;
      this.countryName = '';
      this.cityName = '';
      this.phoneNumber = '';
      this.firstLogin = false;
      this.role = '';
    }
  }

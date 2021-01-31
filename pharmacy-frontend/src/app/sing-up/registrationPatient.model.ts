export class RegistrationPatientModel {

  loginInfo: {
    email: string,
    password: string
  };

  accountInfo: {
    lastName: string,
    name: string,
    phoneNumber: string
  };

  location: {
    city: {
      country: {
        name: string
      },
      name: string,
      zipCode: string
    },
    address: {
      street: string,
      number: string
    }
  };



  constructor() {
    this.loginInfo = {
      email: '',
      password: ''
    };

    this.accountInfo = {
        lastName: '',
        name: '',
        phoneNumber: ''
    };

    this.location = {
      city: {
        country: {
          name: ''
        },
        name: '',
        zipCode: ''
      },
      address: {
        street: '',
        number: ''
      }
    };


  }



}

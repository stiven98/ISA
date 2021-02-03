

export class NewPharmacyModel {

  name: string;
  description: string;

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

    this.name = '';
    this.description = '';


  }
}

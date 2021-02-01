
export class ChangeUserModel {
    email:String;
    password:String;
    cityName:String;
    countryName:String;
    zipCode:number;
    street:string;
    streetNumber:number;
    name:String;
    lastName:String;
    phoneNumber:String;

    constructor() {
      this.name = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.street ='';
      this.streetNumber= 0;
      this.zipCode= 0;
      this.countryName = '';
      this.cityName = '';
      this.phoneNumber = '';
    }
  }

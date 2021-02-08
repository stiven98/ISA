

export class OfferValidation {

  validDeliveryTime: string;
  validPrice: string;

  constructor() {
    this.validDeliveryTime = 'no-validate';
    this.validPrice = 'no-validate';
  }

  isValidPrice = (price) => {
    if (isNaN(price) || price === '') {
      this.validPrice = 'is-invalid';
      return false;
    } else {
      this.validPrice = 'is-valid';
      return true;
    }
  }

  isValidDeliveryTime = (time: Date, deadline: Date) => {
    if (new Date(time).getTime() <= new Date().getTime() || new Date(time).getTime() > new Date(deadline).getTime() ) {
      this.validDeliveryTime = 'is-invalid';
      return false;
    } else {
      this.validDeliveryTime = 'is-valid';
      return true;
    }
  }
}

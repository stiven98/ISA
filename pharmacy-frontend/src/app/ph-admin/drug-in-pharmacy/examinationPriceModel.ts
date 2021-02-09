export class ExaminationPriceModel {
  examinationPriceId;
  examinationType:String;
  price:number;
  startDate:Date;
  endDate:Date;

    constructor() {
      this.examinationPriceId = '';
      this.examinationType = '';
      this.price = 0;
      this.startDate = new Date();
      this.endDate = new Date();
    }
  }
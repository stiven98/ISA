export class DrugPriceModel {
    idDrug;
    startDate:Date;
    endDate:Date;
    price:number;

    constructor() {
      this.idDrug = '';
      this.startDate = new Date();
      this.endDate = new Date();
      this.price = 0;
    }
  }
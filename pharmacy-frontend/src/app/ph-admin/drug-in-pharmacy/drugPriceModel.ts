export class DrugPriceModel {
    idDrug;
    startDate:Date;
    endDate:Date;
    price:number;
    drugPrice;
    drugName:String;

    constructor() {
      this.idDrug = '';
      this.startDate = new Date();
      this.endDate = new Date();
      this.price = 0;
      this.drugPrice = '';
      this.drugName = '';
    }
  }
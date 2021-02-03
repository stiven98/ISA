export class DrugInpharmacyChangeModel {
    pharmacyAdminEmail:String;
    drugId:String;
    quantity:number;

    constructor() {
      this.pharmacyAdminEmail = '';
      this.drugId = '';
      this.quantity = 0;
    }
  }
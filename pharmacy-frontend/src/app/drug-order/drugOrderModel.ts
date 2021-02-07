
export class DrugOrderModel {
    pharmacyAdminEmail: String;
    deadline: Date;
    drugOrderItems;

    constructor() {
      this.pharmacyAdminEmail = '';
      this.deadline = new Date();
      this.drugOrderItems = [];
    }
  }

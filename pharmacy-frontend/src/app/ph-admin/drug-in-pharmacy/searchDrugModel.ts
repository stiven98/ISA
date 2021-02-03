export class SearchDrugModel {
    phAdminEmail:String;
    name:String;
    code:String;
    typeOfDrug:String;
    formOfDrug:String;
    issuanceRegime:String;
    manufactureName:String;
    quantity:number;

    constructor() {
        this.phAdminEmail = '';
        this.name = '';
        this.code= '';
        this.typeOfDrug = '';
        this.formOfDrug = '';
        this.issuanceRegime = '';
        this.manufactureName = '';
        this.quantity = 0;
    }
  }
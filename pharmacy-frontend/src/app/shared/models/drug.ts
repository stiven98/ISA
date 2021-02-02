export class Drug{
  code: string;
  drugId;
  formOfDrug: string;
  ingredients: [];
  issuanceRegime: string;
  manufacturer;
  name: string;
  note: string;
  priceList;
  typeOfDrug: string;

  constructor() {
    this.code = '';
    this.drugId = null;
    this. formOfDrug = '';
    this.ingredients = null;
    this.issuanceRegime = '';
    this. manufacturer = null;
    this. name = '';
    this.note = '';
    this.priceList = null;
    this.typeOfDrug = '';
  }
}

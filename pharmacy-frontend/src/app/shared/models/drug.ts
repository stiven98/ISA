import {Manufacturer} from './manufacturer';

export class Drug{
  code: string;
  drugId;
  formOfDrug: string;
  ingredients: [];
  issuanceRegime: string;
  manufacturer: Manufacturer;
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
    this. manufacturer = new Manufacturer();
    this. name = '';
    this.note = '';
    this.priceList = null;
    this.typeOfDrug = '';
  }
}

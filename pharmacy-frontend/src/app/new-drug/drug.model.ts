

export class DrugModel {

  name: string;
  code: string;
  typeOfDrug: string;
  formOfDrug: string;
  ingredients: string [];
  allergies: [];
  substituteDrug: string [];
  note: string;
  issuanceRegime: string;
  dailyDose: number;
  contraindication: string [];
  manufacturer: string;



  constructor() {
    this.name = '';
    this.code = '';
    this.typeOfDrug = 'Choose...';
    this.formOfDrug = 'Choose...';
    this.ingredients = [];
    this.allergies = [];
    this.substituteDrug = [];
    this.note = '';
    this.issuanceRegime = 'Choose..';
    this.dailyDose = 0;
    this.contraindication = [];
    this.manufacturer = '';
  }



}

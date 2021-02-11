

export class DrugValidation {
  validName: string;
  validCode: string;
  validTypeOfDrug: string;
  validFormOfDrug: string;
  validNote: string;
  validSubstituteDrug: string;
  validIssuanceRegime: string;
  validDailyDose: string;
  validNewContraindication: string;
  validContraindication: string;
  validNewIngredient: string;
  validIngredient: string;
  validPoints: string;
  validManufacturer: string;
  validStatus: string;

  constructor() {
    this.validName = 'no-validate';
    this.validCode = 'no-validate';
    this.validTypeOfDrug = 'no-validate';
    this.validFormOfDrug = 'no-validate';
    this.validCode = 'no-validate';
    this.validSubstituteDrug = 'no-validate';
    this.validIssuanceRegime = 'no-validate';
    this.validDailyDose = 'no-validate';
    this.validNewContraindication = 'no-validate';
    this.validContraindication = 'no-validate';
    this.validNewIngredient = 'no-validate';
    this.validIngredient = 'no-validate';
    this.validPoints = 'no-validate';
    this.validManufacturer = 'no-validate';
  }

  isValidStatus = (status) => {
    if (status === 'Choose...') {
      this.validIssuanceRegime = 'is-invalid';
      return false;
    } else {
      this.validIssuanceRegime = 'is-valid';
      return true;
    }
  }

  isValidManufacturer = (manufacturer) => {
    if (manufacturer === 'Choose...') {
      this.validManufacturer = 'is-invalid';
      return false;
    } else {
      this.validManufacturer = 'is-valid';
      return true;
    }
  }

  isValidFormOfDrug = (formOfDrug) => {
    if (formOfDrug === 'Choose...') {
      this.validFormOfDrug = 'is-invalid';
      return false;
    } else {
      this.validFormOfDrug = 'is-valid';
      return true;
    }
  }

  isValidTypeOfDrug = (typeOfDrug) => {
    if (typeOfDrug === 'Choose...') {
      this.validTypeOfDrug = 'is-invalid';
      return false;
    } else {
      this.validTypeOfDrug = 'is-valid';
      return true;
    }
  }

  isValidDailyDose = (dose: number) => {
    if (isNaN(dose) || dose < 1) {
      this.validDailyDose = 'is-invalid';
      return false;
    } else {
      this.validDailyDose = 'is-valid';
      return true;
    }
  }

  isValidPoints = (points: number) => {
    if (isNaN(points) || points < 1) {
      this.validPoints = 'is-invalid';
      return false;
    } else {
      this.validPoints = 'is-valid';
      return true;
    }
  }

  isValidCode = (code: string) => {
    if (code.length > 0) {
      this.validCode = 'is-valid';
      return true;
    } else {
      this.validCode = 'is-invalid';
      return false;
    }
  }

  isValidName = (name: string) => {
    if (name.length > 0) {
      this.validName = 'is-valid';
      return true;
    } else {
      this.validName = 'is-invalid';
      return false;
    }
  }


  isValidNote = (note: string) => {
    if (note.length > 0) {
      this.validNote = 'is-valid';
      return true;
    } else {
      this.validNote = 'is-invalid';
      return false;
    }
  }

}

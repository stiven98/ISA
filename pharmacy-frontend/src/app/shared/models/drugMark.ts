import {Patient} from './patient';
import {Drug} from './drug';

export class DrugMark {
  drugMarksId;
  mark: number;
  patient: Patient;
  drug: Drug;

  constructor() {
    this.drugMarksId = null;
    this.patient = new Patient();
    this.drug = new Drug();
  }

}

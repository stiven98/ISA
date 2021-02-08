import {Patient} from './patient';
import {Pharmacy} from './Pharmacy';

export class Mark {
  pharmacyMarksId;
  mark: number;
  patient: Patient;
  pharmacy: Pharmacy;

  constructor() {
    this.pharmacyMarksId = null;
    this.patient = new Patient();
    this.pharmacy = new Pharmacy();
  }

}

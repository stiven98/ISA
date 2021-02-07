import {Patient} from './patient';

export class MedicalStuffMark {
  medicalStuffMarkId;
  mark: number;
  patient: Patient;
  medicalStuff: Patient;

  constructor() {
    this.medicalStuffMarkId = null;
    this.patient = new Patient();
    this.medicalStuff = new Patient();
  }

}



export class ComplaintModel {

  forWho: string;
  content: string;
  medicalStaffId: string;
  pharmacyId: string;
  emailPatient: string;

  constructor() {
    this.forWho = 'Choose...';
    this.content = '';
    this.pharmacyId = 'Choose...';
    this.medicalStaffId = 'Choose...';
    this.emailPatient = '';
  }


}

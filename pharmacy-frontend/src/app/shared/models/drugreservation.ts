export class DrugReservation{
  patientEmail: String;
  deadline: String;
  pharmacyId;
  quantity: number;
  drugId;
  price: number;

  constructor() {
    this.patientEmail = '';
    this.deadline = '';
    this.pharmacyId = null;
    this.quantity = 0;
    this.drugId = null;
    this.price = 0;
  }
}

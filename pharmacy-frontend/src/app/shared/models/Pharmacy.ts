export class Pharmacy{
  id;
  name: string;
  averageMark: number;
  dermatologists;
  description: string;
  drugPriceList = [];
  examinationPriceList = [];
  location = {};
  phAdmins = [];
  pharmacists = [];
  examinations = [];

  constructor() {
    this.id = null;
    this.name = '';
    this.averageMark = 0;
    this.dermatologists = null;
    this.description = '';
    this.drugPriceList = null;
    this.examinationPriceList = null;
    this.location = null;
    this.phAdmins = null;
    this.pharmacists = null;
    this.examinations = null;
  }
}

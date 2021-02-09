import { Component, OnInit } from '@angular/core';
import {DrugService} from '../services/drug.service';
import {Patient} from '../shared/models/patient';
import {AuthService} from '../services/auth.service';
import {DrugInPharmacyService} from '../services/drug-in-pharmacy.service';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css']
})
export class DrugsComponent implements OnInit {

  drugs: any [];
  currentUser = new Patient();
  firstRange = true;
  secondRange = true;
  thirdRange = true;
  showDrugs: any [];
  searchText = '';
  selectedHerbalMedicine = true;
  selectedAntibiotic = true;
  selectedAnesthetic = true;
  selectedAntihistamine = true;

  constructor(private drugService: DrugService,
              private authService: AuthService,
              private drugInPharmacy: DrugInPharmacyService) {
  }

  ngOnInit(): void {
    this.drugs = [];
    this.showDrugs = [];
    this.drugService.findAllFullDrugs().subscribe((response) => {
      for (const drug of response) {
        this.drugInPharmacy.findPharmaciesWithDrug(drug.drugId).subscribe(responsePharmacies => {
          this.drugService.findByIds(drug.substituteDrugs).subscribe(drugs => {
            this.drugs.push({...drug, pharmacies: responsePharmacies, substituteDrugsObj: drugs});
            this.showDrugs.push({...drug, pharmacies: responsePharmacies, substituteDrugsObj: drugs});
          });
        });
      }
      setTimeout(() => {
        console.log(this.drugs);
      }, 2000);
    });
  }

  search = () => {
    this.showDrugs = [];
    for (const item of this.drugs) {
      if (this.isInTextSearch(item) && this.isInMark(item.averageMark) && this.isInTypeOfDrug(item.typeOfDrug)){
        this.showDrugs.push(item);
      }
    }


  }

  isInTextSearch = (item) => {
    if (this.searchText === '') {
      return true;
    } else {
      if (item.name.toLowerCase().includes(this.searchText.toLowerCase())){
        return true;
      } else {
        return false;
      }
    }
  }

  isInMark = (mark) => {
    return this.isInFirstRange(mark) || this.isInSecondRange(mark) || this.isInThirdRange(mark);
  }

  isInFirstRange = (mark) => {
    return mark <= 3.5 && mark >= 0.0 && this.firstRange;
  }

  isInSecondRange = (mark) => {
    return mark <= 6.5 && mark >= 3.5 && this.secondRange;
  }

  isInThirdRange = (mark) => {
    return mark <= 10.0 && mark >= 6.5 && this.thirdRange;
  }

  isHerbalMedicine = (typeOfDrug) => {
    return typeOfDrug === 'HerbalMedicine' && this.selectedHerbalMedicine;
  }
  isAntibiotic = (typeOfDrug) => {
    return typeOfDrug === 'Antibiotic' && this.selectedAntibiotic;
  }
  isAnesthetic = (typeOfDrug) => {
    return typeOfDrug === 'Anesthetic' && this.selectedAnesthetic;
  }
  isAntihistamine = (typeOfDrug) => {
    return typeOfDrug === 'Antihistamine' && this.selectedAntihistamine;
  }

  isInTypeOfDrug = (typeOfDrug) => {
    return this.isHerbalMedicine(typeOfDrug) || this.isAnesthetic(typeOfDrug) || this.isAnesthetic(typeOfDrug) || this.isAntihistamine(typeOfDrug);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Drug} from '../shared/models/drug';

@Injectable({
  providedIn: 'root'
})
export class DrugService {
  constructor(private http: HttpClient) { }

  findDrugQuantity = (drugId, pharmacyId) => {
    return this.http
      .post(environment.apiUrl + '/api/drugInPharmacy/getQuantity/', { "drugId": drugId, "pharmacyId": pharmacyId})
      .pipe(map((responseData: number) => {
        return responseData;
      }));
  }


  findDrugPrice = (pharmacyId, drugId) => {
    return this.http
      .post(environment.apiUrl + '/api/drugPrice/price/', { "pharmacyId": pharmacyId, "drugId": drugId})
      .pipe(map((responseData: number) => {
        return responseData;
      }));
  }
  findDrugByName = (name) => {
    return this.http
    .get(environment.apiUrl + '/api/drug/name/' + name)
      .pipe(map((responseData: Drug) => {
        return responseData;
      }));
  }
  findAll = () => {
    return this.http
      .get(environment.apiUrl + '/api/drug/all')
      .pipe(map(responseData => {
        const drugs = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            drugs.push(responseData[key]);
          }
        }
        return drugs;
      }));
  }

  findAllContraindications = () => {
    return this.http
      .get(environment.apiUrl + '/api/contraindication/all')
      .pipe(map(responseData => {
        const contraindications = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            contraindications.push(responseData[key]);
          }
        }
        return contraindications;
    }));
  }

  addContraindication = (contraindication) => {
     return this.http.post(environment.apiUrl + '/api/contraindication/add', contraindication);
  }

  findAllIngredients = () => {
    return this.http.get(environment.apiUrl + '/api/ingredient/all')
      .pipe(map(responseData => {
        const ingredients = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            ingredients.push(responseData[key]);
          }
        }
        return ingredients;
      }));
  }

  addIngredient = (ingredient) => {
    return this.http.post(environment.apiUrl + '/api/ingredient/add', ingredient);
  }

  addDrug = (drug) => {
    return this.http.post(environment.apiUrl + '/api/drug/add', drug);
  }

  findAllManufacturers = () => {
    return this.http.get(environment.apiUrl + '/api/manufacturer/all')
      .pipe(map(responseData => {
        const manufacturers = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            manufacturers.push(responseData[key]);
          }
        }
        return manufacturers;
      }));
  }
}

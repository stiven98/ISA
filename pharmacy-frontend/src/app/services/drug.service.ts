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
}

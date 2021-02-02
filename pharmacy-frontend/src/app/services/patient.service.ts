import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Drug} from '../shared/models/drug';
import {newArray} from '@angular/compiler/src/util';
import {AccountCategory} from '../shared/models/accountCategory';
import {Pharmacy} from '../shared/models/Pharmacy';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http: HttpClient) {
  }

  addAllergy = (email, drugName) => {
    return this.http
      .post(environment.apiUrl + '/api/patient/addAllergy/', { "email": email, "drugName": drugName})
      .pipe(map(responseData => {
        return responseData;
      }));
  }
  findAllergies = (email) => {
    return this.http
      .get(environment.apiUrl + '/api/patient/allergies/' + email)
      .pipe(map(responseData => {
        const allergies = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
           allergies.push(responseData[key]);
          }
        }
        return allergies;
      }));
  }
  findAccountCategory = (email) => {
    return this.http
      .get(environment.apiUrl + '/api/patient/accountCategory/' + email)
      .pipe(map((responseData: AccountCategory) => {
        return responseData;
      }));
  }
  findPenalties = (email) => {
    return this.http
      .get(environment.apiUrl + '/api/patient/penalty/' + email)
      .pipe(map((responseData: number) => {
        return responseData;
      }));
  }
}

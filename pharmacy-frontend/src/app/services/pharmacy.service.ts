import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Pharmacy} from '../shared/models/Pharmacy';
import {FreeTermDTO} from '../shared/models/FreeTermDTO';


@Injectable({
  providedIn: 'root'
})
export class PharmacyService {
  pharmacies = [];
  constructor(private http: HttpClient) { }

  findAllWithFreeTerm = (dto: FreeTermDTO) => {
    return this.http
      .post(environment.apiUrl + '/api/examination/pharmaciesWithFreeTerms/', dto)
      .pipe(map(responseData => {
        const pharmacies = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            pharmacies.push(responseData[key]);
          }
        }
        return pharmacies;
      }));
  }

  searchPharmacies = (pharmacyName, pharmacyCity, pharmacyMark) => {
    return this.http
      .post(environment.apiUrl + '/api/pharmacy/search/',
        {"pharmacyName": pharmacyName, "pharmacyCity": pharmacyCity, "pharmacyMark": pharmacyMark} )
      .pipe(map(responseData => {
        const pharmacies = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            pharmacies.push(responseData[key]);
          }
        }
        return pharmacies;
      }));
  }

  findPharmaciesWithDrug = (drugId) => {
    return this.http
      .get(environment.apiUrl + '/api/drugInPharmacy/pharmacies/' + drugId)
      .pipe(map(responseData => {
        const pharmacies = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            pharmacies.push(responseData[key]);
          }
        }
        return pharmacies;
      }));
  }
  findAll = () => {
    return this.http
      .get(environment.apiUrl + '/api/pharmacy/all')
      .pipe(map(responseData => {
        const pharmacies = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            pharmacies.push(responseData[key]);
          }
        }
        return pharmacies;
      }));
  }

  findByName = (name) => {
    return this.http
      .get(environment.apiUrl + '/api/pharmacy/name/' + name)
      .pipe(map((responseData: Pharmacy) => {
         return responseData;
      }));
  }

  findMedicalStuffById = (id) => {
    return this.http
      .get(environment.apiUrl + '/api/medicalStuff/id/' + id)
      .pipe(map(responseData => {
        const medicalStuff = responseData;
        return responseData;
      }));
  }
  findDrugById = (id) => {
    return this.http
      .get(environment.apiUrl + '/api/drugInPharmacy/id/' + id)
      .pipe(map(responseData => {
        const drugs = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            drugs.push(responseData[key]);
            console.log(responseData);
          }
        }
        return drugs;
      }));
  }

  saveAndFlush = (pharmacy) => {
    return this.http
      .post(environment.apiUrl + '/api/pharmacy/add', pharmacy);
  }

  findById = (id: String) => {
    return this.http.get(environment.apiUrl + '/api/pharmacy/id/' + id);
  }


  getPharmaciesForComplaintForPatient = (emailPatient: string) => {
    return this.http.get(environment.apiUrl + '/api/pharmacyMarks/pharmaciesForPatient/' + emailPatient)
      .pipe(map( response => {
        const pharmacies = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            pharmacies.push(response[key]);
          }
        }
        return pharmacies;
      }));
  }


}

import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AccountCategory} from '../shared/models/accountCategory';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http: HttpClient) {
  }

  findPharmaciesToMark = (email) => {
    return this.http
      .get(environment.apiUrl + '/api/pharmacyMarks/pharmaciesForPatient/' + email)
      .pipe(map(responseData => {
        const pharmacies = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            pharmacies.push(responseData[key]);
          }
        }
        return pharmacies ;
      }));
  }
  findMarksByPatient = (email) => {
    return this.http
      .get(environment.apiUrl + '/api/pharmacyMarks/marksFor/' + email)
      .pipe(map(responseData => {
        const marks = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            marks.push(responseData[key]);
          }
        }
        return marks ;
      }));
  }
  findDrugsToMark = (email) => {
    return this.http
      .get(environment.apiUrl + '/api/drugMarks/drugsForPatient/' + email)
      .pipe(map(responseData => {
        const drugs = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            drugs.push(responseData[key]);
          }
        }
        return drugs ;
      }));
  }
  findERecepies = (email) => {
    return this.http
      .get(environment.apiUrl + '/api/erecepie/getPatientERecepies/' + email)
      .pipe(map(responseData => {
        const erecepies = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            const tmp = responseData[key];
            tmp.dateOfIssuing = new Date(tmp.dateOfIssuing).toLocaleDateString();
            erecepies.push(tmp);
          }
        }
        return erecepies;
      }));
  }
  cancelReservation = (reservation) => {
    return this.http
      .get(environment.apiUrl + '/api/drugReservation/cancel/' + reservation)
      .pipe(map(responseData => {
        return responseData;
      }));
  }
  findReservations = (email) => {
    return this.http
      .get(environment.apiUrl + '/api/drugReservation/getPatientReservations/' + email)
      .pipe(map(responseData => {
        const reservations = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            const tmp = responseData[key];
            tmp.reservationDateRange.startDate = new Date(tmp.reservationDateRange.startDate).toLocaleDateString();
            tmp.reservationDateRange.endDate = new Date(tmp.reservationDateRange.endDate).toLocaleDateString();
            reservations.push(tmp);
          }
        }
        return reservations;
      }));
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

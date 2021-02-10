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
  findMEdicalStuffMarksByPatient = (email) => {
    return this.http
      .get(environment.apiUrl + '/api/medicalStuffMarks/marksFor/' + email)
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
  findPatientConsulations = (email) => {
    return this.http
      .get(environment.apiUrl + '/api/examination/getPatientConsulatitons/' + email)
      .pipe(map(responseData => {
        const examinations = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            const tmp = responseData[key];
            tmp.dateOfExamination = new Date(tmp.dateOfExamination).toLocaleDateString();
            examinations.push(tmp);
          }
        }
        return examinations ;
      }));
  }
  findPatientExaminations = (patientEmail) => {
    return this.http
      .get(environment.apiUrl + '/api/examination/getPatientExaminations/' + patientEmail)
      .pipe(map(responseData => {
        const examinations = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            const tmp = responseData[key];
            tmp.dateOfExamination = new Date(tmp.dateOfExamination).toLocaleDateString();
            examinations.push(tmp);
          }
        }
        return examinations ;
      }));
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
  findMedicalStuffToMark = (email) => {
    return this.http
      .get(environment.apiUrl + '/api/medicalStuffMarks/medicalStuffToMark/' + email)
      .pipe(map(responseData => {
        const medicalStuff = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            medicalStuff.push(responseData[key]);
          }
        }
        return medicalStuff ;
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

  findDrugMarksByPatient = (email) => {
    return this.http
      .get(environment.apiUrl + '/api/drugMarks/marksFor/' + email)
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
  cancelConsultations = (consultations) => {
    return this.http
      .get(environment.apiUrl + '/api/examination/cancelConsultations/' + consultations)
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

  findAllSubscribedPharmacy = (email) => {
    return this.http.post(environment.apiUrl + '/api/patient/subscribedPharmacies', email)
      .pipe(map(response => {
        const pharmacies = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            pharmacies.push(response[key]);
          }
        }
        console.log(pharmacies);
        return pharmacies;
      }));
  }

  unsubscribePharmacy = (email: string, id: string) => {
    return this.http.get(environment.apiUrl + '/api/patient/unsubscribePharmacy/' + email + '/' + id);
  }

  isSubscribedPharmacy = (email, id) => {
    return this.http.get(environment.apiUrl + '/api/patient/isSubscribed/' + email + '/' + id);
  }

  subscribePharmacy = (email: string, id: string) => {
    return this.http.get(environment.apiUrl + '/api/patient/subscribe/' + email + '/' + id);
  }
}

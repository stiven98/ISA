import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Markdto} from '../shared/models/markdto';

@Injectable({
  providedIn: 'root'
})
export class PharmacymarkService {

  constructor( private http: HttpClient ) { }

  addPharmacyMark = (pharmacyName, patientEmail, mark) => {
    return this.http
      .post(environment.apiUrl + '/api/pharmacyMarks/createMark/',
        { "pharmacyName" : pharmacyName, "patientEmail" : patientEmail, "mark" : mark})
      .pipe(map(responseData => {
        return responseData;
      }));
  }
  findMarksByPatient = (email) => {
    return this.http
      .get(environment.apiUrl + '/api/pharmacyMarks/marksForPatient/' + email)
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

  changeMark = (markdto: Markdto) => {
    const dto = markdto;
    return this.http
      .post(environment.apiUrl + '/api/pharmacyMarks/changeMark/', dto)
      .pipe(map(responseData => {
        return responseData;
      }));
  }


}

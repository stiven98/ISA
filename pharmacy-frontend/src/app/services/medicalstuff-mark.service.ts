import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {MedicalStuffMarkDto} from '../shared/models/MedicalStuffMarkDto';

@Injectable({
  providedIn: 'root'
})
export class MedicalstuffMarkService {

  constructor(private http: HttpClient) { }

  addMedicalStuffMark = (email, patientEmail, mark) => {
    return this.http
      .post(environment.apiUrl + '/api/medicalStuffMarks/createMark/',
        { "medicalStuffEmail" : email, "patientEmail" : patientEmail, "mark" : mark})
      .pipe(map(responseData => {
        return responseData;
      }));
  }
  findMarksByPatient = (email) => {
    return this.http
      .get(environment.apiUrl + '/api/medicalStuffMarks/marksForPatient/' + email)
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

  changeMark = (medicalStuffMarkdto: MedicalStuffMarkDto) => {
    const dto = medicalStuffMarkdto;
    return this.http
      .post(environment.apiUrl + '/api/medicalStuffMarks/changeMark/', dto)
      .pipe(map(responseData => {
        return responseData;
      }));
  }
}

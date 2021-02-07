import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {DrugMarkDto} from '../shared/models/drugMarkDto';
import {Markdto} from '../shared/models/markdto';

@Injectable({
  providedIn: 'root'
})
export class DrugMarksService {

  constructor(private http: HttpClient) { }

  addDrugMark = (drugName, patientEmail, mark) => {
    return this.http
      .post(environment.apiUrl + '/api/drugMarks/createMark/',
        { "drugName" : drugName, "patientEmail" : patientEmail, "mark" : mark})
      .pipe(map(responseData => {
        return responseData;
      }));
  }
  findMarksByPatient = (email) => {
    return this.http
      .get(environment.apiUrl + '/api/drugMarks/marksForPatient/' + email)
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

  changeMark = (markdto: DrugMarkDto) => {
    const dto = markdto;
    return this.http
      .post(environment.apiUrl + '/api/drugMarks/changeMark/', dto)
      .pipe(map(responseData => {
        return responseData;
      }));
  }
}

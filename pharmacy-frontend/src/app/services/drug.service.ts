import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DrugService {
  constructor(private http: HttpClient) { }

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

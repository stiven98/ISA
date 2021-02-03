import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {DrugReservation} from '../shared/models/drugreservation';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DrugreservationService {

  constructor(private http: HttpClient) { }
  createReservation = (drugReservation: DrugReservation) => {
    return this.http
      .post(environment.apiUrl + '/api/drugReservation/createReservation/', drugReservation)
      .pipe(map(responseData => {
        return responseData;
      }));
  }
}

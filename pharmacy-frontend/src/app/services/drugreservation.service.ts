import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {DrugReservation} from '../shared/models/drugreservation';
import {HttpClient} from '@angular/common/http';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DrugreservationService {
  issueDrug(drugReservationId: any) {
    return this.api.post(this.config.issue_drug + drugReservationId, {})
    .pipe( map( res => 
      {
        return res;
      }));
  }

  constructor(private http: HttpClient, private api : ApiService, private config : ConfigService) { }
  createReservation = (drugReservation: DrugReservation) => {
    return this.http
      .post(environment.apiUrl + '/api/drugReservation/createReservation/', drugReservation)
      .pipe(map(responseData => {
        return responseData;
      }));
  }

  findReservationByCode(code){
    return this.api.get(this.config.find_reservation_by_code + code)
    .pipe( map( res => 
      {
        return res;
      }));
  }

}

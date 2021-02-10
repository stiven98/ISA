import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {LoyaltyProgramModel} from '../my-offers/loyalty-program.model';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyProgramService {

  constructor(private http: HttpClient) {
  }

  getLoyaltyProgram = () => {
    return this.http.get(environment.apiUrl + '/api/loyaltyProgram/get').pipe(response  => {
      return response;
    });
  }


  updateLoyaltyProgram = (loyaltyProgramModel: LoyaltyProgramModel) => {
    return this.http.post(environment.apiUrl + '/api/loyaltyProgram/update', loyaltyProgramModel).pipe(response => {
      return response;
    });
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {



  constructor(private http: HttpClient) {
  }

  findAll = () => {
    return this.http
      .get(environment.apiUrl + '/api/country/all')
      .pipe(map(responseData => {
        const countries = [];
        for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              countries.push(responseData[key].name);
            }
        }
        return countries;
      }));
  }



}

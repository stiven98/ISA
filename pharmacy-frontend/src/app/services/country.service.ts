import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountryService {



  constructor(private http: HttpClient) {
  }

  findAll = () => {
    return this.http
      .get('http://localhost:8080/api/country/all')
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

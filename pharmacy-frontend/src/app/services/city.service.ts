import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CityService {

  cities = [];
  constructor(private http: HttpClient) {
  }

  findAll = () => {
    return this.http
      .get(environment.apiUrl + '/api/city/all' )
      .pipe(map(responseData => {
        const cities = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)){
            cities.push(responseData[key].name);
          }
        }
        return cities;
      }));
  }

  findAllByCountry = (country: string) => {
    return this.http
      .get(environment.apiUrl + '/api/city/byCountry', { params: { name: country }} )
      .pipe(map(responseData => {
        const cities = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)){
            cities.push(responseData[key].name);
          }
        }
        return cities;
      }));
  }
}

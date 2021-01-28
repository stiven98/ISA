import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})
export class CityService {

  cities = [];
  constructor(private http: HttpClient) {
  }

  findAll = () => {
    return this.http
      .get('http://localhost:8080/api/city/all')
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

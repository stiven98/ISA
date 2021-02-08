import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) {
  }

  saveOffer = (offer) => {
    return this.http.post(environment.apiUrl + '/api/offer/add', offer);
  }

  findAll = (id: string) => {
    return this.http.get(environment.apiUrl + '/api/offer/supplier/' + id)
      .pipe(map(response => {
        const items = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            items.push(response[key]);
          }
        }
        return items;
      }));
  }


  updateOffer = (id: string, newPrice: string) => {
    return this.http.get(environment.apiUrl + '/api/offer/' + id + '/' + newPrice);
  }
}

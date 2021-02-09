import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient, private apiService : ApiService, private config : ConfigService) {
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



getAllByDrugOrderId(id):Observable<any>{
  return this.apiService.get('http://localhost:8080/api/offer/getBy/' + id) .pipe(map((res:Response) =>{
    return res;
  }));
}


acceptOfer(dto){
  return this.apiService.post('http://localhost:8080/api/offer/acceptOfer',dto) .pipe(map((res) =>{
    return res;
  }));
}








}

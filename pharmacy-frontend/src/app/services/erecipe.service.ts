import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErecipeService {

  constructor(private http: HttpClient) {
  }

  addERecepe = (item) => {
    return this.http.post(environment.apiUrl + '/api/erecepie/add', item);
  }

}

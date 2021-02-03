import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class DermatologistService {

  constructor(private http: HttpClient) {
  }

  saveDermatologist = (dermatologist) => {
    return this.http.post(environment.apiUrl + '/api/dermatologist/add', dermatologist);
  }


}

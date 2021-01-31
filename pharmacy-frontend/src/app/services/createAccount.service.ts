import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CreateAccountService {

  constructor(private http: HttpClient ) {
  }


  register = (account) => {
    return this.http
      .post(environment.apiUrl + '/api/patient/add', account );
  }

}

import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SisAdminService {

  constructor(private http: HttpClient) {
  }

  saveSysAdmin = (sisAdmin) => {
    return this.http.post(environment.apiUrl + '/api/systemAdministrator/add', sisAdmin);
  }


}

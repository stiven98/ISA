import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhAdminService {

  constructor(private http: HttpClient) {
  }

  savePharmacyAdministrator = (administrator, id) => {
    return this.http.post(environment.apiUrl + '/api/phadmin/add/' + id, administrator);
  }


}

import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) {
  }

  saveSupplier = (supplier) => {
    return this.http.post(environment.apiUrl + '/api/supplier/add', supplier);
  }


}

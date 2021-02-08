import {Injectable} from '@angular/core';
import {ComplaintModel} from '../complaint/complaint.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {

  constructor(private http: HttpClient) {
  }

  saveAndFlush = (complaintRequest: ComplaintModel) => {
    return this.http.post(environment.apiUrl + '/api/complaint/add', complaintRequest);
  }




}

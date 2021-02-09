import {Injectable} from '@angular/core';
import {ComplaintModel} from '../complaint/complaint.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {

  constructor(private http: HttpClient) {
  }

  saveAndFlush = (complaintRequest: ComplaintModel) => {
    return this.http.post(environment.apiUrl + '/api/complaint/add', complaintRequest);
  }

  findAll = () => {
    return this.http.get(environment.apiUrl + '/api/complaint/all')
      .pipe(map(response => {
        const ret = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            if (response[key].statusOfComplaint === 'no_answered') {
              ret.push({...response[key], answer: '', validAnswer: 'no-validate'});
            }
          }
        }
        return ret;
    }));
  }

  sendAnswer = (item) => {
    return this.http.post(environment.apiUrl + '/api/complaint/sendAnswer', {complaintId: item.complaintId, email: item.patient.username, content: item.answer});
  }




}

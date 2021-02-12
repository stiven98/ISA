import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {findReadVarNames} from '@angular/compiler/src/output/output_ast';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  constructor(private router: Router,
              private http: HttpClient) {
  }

  uploadQrCode = (file: File) => {
    const formData = new FormData();

    formData.append('file', file);

    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(environment.apiUrl + '/api/erecepie/uploadQrCode', formData)
      .pipe(map(responseData => {
        const ret = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)){
            ret.push(responseData[key]);
          }
        }
        return ret;
      }));

  }
}

import {Injectable} from '@angular/core';
import {AccountInfoModel} from '../sing-in/accountInfo.model';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  loginRequest = (accountInfoModel: AccountInfoModel) => {
    return this.http
      .post('http://localhost:8080/api', accountInfoModel);
  }
}

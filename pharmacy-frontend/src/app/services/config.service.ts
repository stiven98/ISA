import {Injectable} from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _api_url = environment.apiUrl + '/api';
  private _auth_url = environment.apiUrl +'/auth';
  private _user_url = this._api_url + '/user';
  private _patient_url = this._api_url + '/patient';
  private _drug_url = this._api_url + '/drug'
  private _drug_order_url = this._api_url + '/drugOrder';
  private _examination_url = this._api_url + '/examination';
  private _medical_stuff_url = this._api_url + '/medicalStuff';
  private _refresh_token_url = this._api_url + '/refresh';

  get refresh_token_url(): string {
    return this._refresh_token_url;
  }

  private _login_url = this._auth_url + '/login';

  get login_url(): string {
    return this._login_url;
  }

  private _change_password_url = this._user_url + '/changePassword';

  get change_password_url(): string {
    return this._change_password_url;
  }

  private _users_url = this._user_url + '/all';

  get users_url(): string {
    return this._users_url;
  }

  private _get_user_url = this._user_url + '/getUser';

  get get_user_url(): string {
    return this._get_user_url;
  }

  private _get_user_by_id = this._user_url + '/getById/';

  get  get_user_by_id (): string {
    return this._get_user_by_id ;
  }

  private _user_change = this._user_url + '/change';

  get user_change (): string {
    return this._user_change ;
  }

  private _get_patients_by_medical_stuff = this._patient_url + '/getPatientsByMedicalStuffId/';

  get get_patients_by_medical_stuff (): string {
    return this._get_patients_by_medical_stuff ;
  }
  private _get_drug_for_order = this._drug_url + '/drugForOrder';

  get get_drug_for_order (): string {
    return this._get_drug_for_order ;
  }

  private _drug_order_create = this._drug_order_url + '/createOrder';

  get drug_order_create (): string {
    return this._drug_order_create ;
  }

  private _examinations_by_employee = this._examination_url + '/allByEmployee';

  get examinations_by_employee (): string {
    return this._examinations_by_employee ;
  }

  private _vacations = this._medical_stuff_url + '/vacations';

  get vacations (): string {
    return this._vacations ;
  }

}

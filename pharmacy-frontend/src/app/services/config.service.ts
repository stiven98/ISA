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
  private _drug_in_pharmacy_url = this._api_url + '/drugInPharmacy';
  private _search_url = this._api_url + '/search';
  private _dermatologist_url = this._api_url + '/dermatologist'
  private _pharmacist_url = this._api_url + '/pharmacist'
  private _drugPrice_url = this._api_url + '/drugPrice'
  private _examination_price_url = this._api_url + '/examinationPrice'
  private _work_time_url = this._api_url + '/workTime'

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

  private _drugs_examination_data = this._drug_url + '/getAllByPatientAndPharmacy';
  get drugs_examination_data(): string {
    return this._drugs_examination_data;
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

  private _get_all_drug_in_pharmacy = this._drug_in_pharmacy_url + '/all/';

  get get_all_drug_in_pharmacy (): string {
    return this._get_all_drug_in_pharmacy ;
  }

  private _drug_in_pharmacy_add = this._drug_in_pharmacy_url + '/add';

  get drug_in_pharmacy_add (): string {
    return this._drug_in_pharmacy_add ;
  }

  private _drug_in_pharmacy_remove = this._drug_in_pharmacy_url + '/remove';

  get drug_in_pharmacy_remove (): string {
    return this._drug_in_pharmacy_remove;
  }

  private _drug_in_pharmacy_update = this._drug_in_pharmacy_url + '/update';

  get drug_in_pharmacy_update (): string {
    return this._drug_in_pharmacy_update;
  }

  private _search_drug_in_pharmacy = this._search_url + '/drug';

  get search_drug_in_pharmacy (): string {
    return this._search_drug_in_pharmacy;
  }

  private _examinations_by_employee = this._examination_url + '/allByEmployee';

  get examinations_by_employee (): string {
    return this._examinations_by_employee ;
  }

  private _examination_by_id = this._examination_url + '/getCurrentExamination/';

  get examination_by_id (): string {
    return this._examination_by_id ;
  }

  private _schedule_new_med = this._examination_url + '/scheduleNewMedStuff';

  get schedule_new_med (): string {
    return this._schedule_new_med ;
  }

  private _give_penalty = this._examination_url + '/givePenalty/';

  get give_penalty (): string {
    return this._give_penalty ;
  }

  private _check_drug_availability = this._examination_url + '/drugAvailability';

  get check_drug_availability (): string {
    return this._check_drug_availability;
  }

  private _examinations_by_employee_and_pharmacy = this._examination_url + '/allByEmployeeAndPharmacy/';

  get examinations_by_employee_and_pharmacy (): string {
    return this._examinations_by_employee_and_pharmacy ;
  }

  private _vacations = this._medical_stuff_url + '/vacations';

  get vacations (): string {
    return this._vacations ;
  }

  private _vacations_by_pharmacy = this._medical_stuff_url + '/vacationsByPharmacy/';

  get vacations_by_pharmacy (): string {
    return this._vacations_by_pharmacy ;
  }

  private _get_all_dermatologist = this._dermatologist_url + '/all';

  get get_all_dermatologist (): string {
    return this._get_all_dermatologist ;
  }

  private _get_all_pharmacist = this._pharmacist_url + '/all';

  get get_all_pharmacist (): string {
    return this._get_all_pharmacist ;
  }

  private _search_dermatologist = this._dermatologist_url + '/searchDermatologist';

  get search_dermatologist (): string {
    return this._search_dermatologist ;
  }

  private _get_my_pharmacies = this._medical_stuff_url + '/myPharmacies';

  get get_my_pharmacies (): string {
    return this._get_my_pharmacies ;
  }

  private _request_vacation = this._medical_stuff_url + '/requestVacation';

  get request_vacation (): string {
    return this._request_vacation ;
  }
  

  private _search_pharmacist = this._pharmacist_url + '/searchPharmacist';

  get search_pharmacist (): string {
    return this._search_pharmacist ;
  }

  private _add_pharmacist = this._pharmacist_url + '/add';

  get add_pharmacist (): string {
    return this._add_pharmacist ;
  }

  
  private _delete_pharmacist = this._pharmacist_url + '/delete';

  get delete_pharmacist (): string {
    return this._delete_pharmacist ;
  }

  private _delete_dermatologist = this._dermatologist_url + '/delete';

  get delete_dermatologist (): string {
    return this._delete_dermatologist ;
  }


  private _add_dermatologist_in_pharmacy = this._dermatologist_url + '/addInPharmacy';

  get add_dermatologist_in_pharmacy (): string {
    return this._add_dermatologist_in_pharmacy ;
  }

  private _get_dermatologist_from_other_pharmacy = this._dermatologist_url + '/allFromOtherPharmacy';

  get get_dermatologist_from_other_pharmacy (): string {
    return this._get_dermatologist_from_other_pharmacy ;
  }


  private _examinations_busy_time = this._examination_url + '/busyTime';

  get examinations_busy_time (): string {
    return this._examinations_busy_time ;
  }

  private _examinations_create = this._examination_url + '/createExamination';

  get examinations_create (): string {
    return this._examinations_create ;
  }

  private _drug_price_create = this._drugPrice_url + '/createDrugPrice';

  get drug_price_create (): string {
    return this._drug_price_create ;
  }

  private _examinatinn_price_get_all = this._examination_price_url + '/all';

  get examinatinn_price_get_all (): string {
    return this._examinatinn_price_get_all ;
  }


  private _examinatinn_price_create = this._examination_price_url + '/create';

  get examinatinn_price_create (): string {
    return this._examinatinn_price_create ;
  }


  private _examinatinn_price_get_all_for_change = this._examination_price_url + '/allForChange';

  get examinatinn_price_get_all_for_change (): string {
    return this._examinatinn_price_get_all_for_change ;
  }

  private _examinatinn_price_change = this._examination_price_url + '/change';

  get examinatinn_price_change (): string {
    return this._examinatinn_price_change ;
  }
  
  private _drug_price_get_all_for_change = this._drugPrice_url + '/allForChange';

  get drug_price_get_all_for_change (): string {
    return this._drug_price_get_all_for_change ;
  }

  private _drug_price_change = this._drugPrice_url + '/change';

  get drug_price_change (): string {
    return this._drug_price_change ;
  }


  private _work_time_get_all = this._work_time_url + '/all/';

  get work_time_get_all (): string {
    return this._work_time_get_all ;
  }


}

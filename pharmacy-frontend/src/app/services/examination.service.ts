import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExaminationCreateModel } from '../ph-admin/create-examination/examinationCreateDTO';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {
  getAllByEmployeeAndPharmacy(id: any): Observable<any[]>{
    return this.apiService.get(this.config.examinations_by_employee_and_pharmacy + id).pipe(map(vacations => {
      return vacations;
    }));
  }

  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    private http: HttpClient
  ) { }

  getAllByEmployee(){
    return this.apiService.get(this.config.examinations_by_employee)
      .pipe(map(examinations => {
        return examinations;
      }));
  }
  getAvailablePharmacists = (pharmacyName) => {
    return this.http
      .get(environment.apiUrl + '/api/examination/findAvailablePharmacists/' + pharmacyName )
      .pipe(map(responseData => {
        const phamracists = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            phamracists.push(responseData[key]);
          }
        }
        return phamracists;
      }));
  }
  getAvailableDermatologists = (pharmacyName) => {
    return this.http
      .get(environment.apiUrl + '/api/examination/getAvailableDermByPharmacy/' + pharmacyName )
      .pipe(map(responseData => {
        const dermatologists = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            const tmp = responseData[key];
            tmp.dateOfExamination = new Date(tmp.dateOfExamination).toLocaleDateString();
            dermatologists.push(responseData[key]);
          }
        }
        return dermatologists;
      }));
  }


  getBusyTime(time){
    return this.apiService.post('http://localhost:8080/api/examination/busyTime',time)
    .pipe(map(res => {return res;}));

  }

  saveExamination(time:ExaminationCreateModel){
    return this.apiService.post('http://localhost:8080/api/examination/createExamination',time)
    .pipe(map(res => {return res;}));

  }



  getCurrentExaminationById(id){
    return this.apiService.get(this.config.examination_by_id + id)
      .pipe(map(examination => {
        return examination;
      }));
  }

  givePenaltyToPatient(id){
    return this.apiService.post(this.config.give_penalty + id, {penalty: 1})
      .pipe(map(res => {
        return res;
      }));
  }

  scheduleNewMed(data){
    return this.apiService.post(this.config.schedule_new_med, data)
      .pipe(map(res => {
        return res;
      }));
  }

  checkDrugAvailability(data){
    return this.apiService.get(this.config.check_drug_availability, data)
      .pipe(map(res => {
        return res;
      }));
  }

  scheduleNewConsulations = (userId: any, name: string, date, time, email) => {
    return this.http
      .post(environment.apiUrl + '/api/examination/scheduleNew/',{"userId": userId, "pharmacyName": name, "date": date, "time": time,"patientEmail": email} )
      .pipe(map(responseData => {
        return responseData;
      }));
  }
}

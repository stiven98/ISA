import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {
  getAllByEmployeeAndPharmacy(id: any) : Observable<any[]>{
    return this.apiService.get(this.config.examinations_by_employee_and_pharmacy + id).pipe(map(vacations => {
      return vacations;
    }));
  }

  constructor(
    private apiService: ApiService,
    private config: ConfigService
  ) { }

  getAllByEmployee(){
    return this.apiService.get(this.config.examinations_by_employee)
      .pipe(map(examinations => {
        return examinations;
      }));
  }


  getBusyTime(time){
    return this.apiService.post('http://localhost:8080/api/examination/busyTime',time)
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

}

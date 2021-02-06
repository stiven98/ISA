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

}

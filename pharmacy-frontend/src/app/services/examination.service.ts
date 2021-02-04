import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

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

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class WorkTimeService {

  constructor(
    private apiService: ApiService,
    private config: ConfigService
  ) { }


  getWorkDay(email:String): Observable<any[]>{
    return this.apiService.get(this.config.work_time_get_all + email)
    .pipe(map(days => {
      return days;
    }));
     
  }







}

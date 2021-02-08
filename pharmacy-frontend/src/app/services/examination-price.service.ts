import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ExaminationPriceService {

  constructor(private apiService: ApiService,
    private config: ConfigService) { }



    getAllExaminationByValideDate() : Observable<any[]>{
      return this.apiService.get('http://localhost:8080/api/examinationPrice/all')
      .pipe(map((res:any[]) => {
        return res;
      }))
    }






}

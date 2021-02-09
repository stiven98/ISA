import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExaminationPriceModel } from '../ph-admin/drug-in-pharmacy/examinationPriceModel';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ExaminationPriceService {

  constructor(private apiService: ApiService,
    private config: ConfigService) { }



    getAllExaminationByValideDate() : Observable<any[]>{
      return this.apiService.get(this.config.examinatinn_price_get_all)
      .pipe(map((res:any[]) => {
        return res;
      }))
    }


    createExaminationPrice(dto:ExaminationPriceModel){
      return this.apiService.post('http://localhost:8080/api/examinationPrice/create',dto).
      pipe(map((res) => {return res;}))
    }




}

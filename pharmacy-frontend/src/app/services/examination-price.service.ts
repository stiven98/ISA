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
      return this.apiService.post(this.config.examinatinn_price_create,dto).
      pipe(map((res) => {return res;}))
    }


    getAllForChange():Observable<ExaminationPriceModel[]>{
      return this.apiService.get(this.config.examinatinn_price_get_all_for_change)
      .pipe(map((res) => {return res;}))
    }


    changeExaminationPrice(dto:ExaminationPriceModel){
      return this.apiService.post(this.config.examinatinn_price_change,dto).
      pipe(map((res) => {return res;}))
    }


}

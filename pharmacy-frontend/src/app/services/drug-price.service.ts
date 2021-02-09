import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DrugPriceModel } from '../ph-admin/drug-in-pharmacy/drugPriceModel';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DrugPriceService {

  constructor(private apiService: ApiService,
    private config: ConfigService) { }



    createDrugPrice(drugPrice:DrugPriceModel){
      return this.apiService.post(this.config.drug_price_create,drugPrice)
      .pipe(map(drugOrder =>{
        return drugOrder;
      }));
    }

    getAllForChange(): Observable<any>{
      return this.apiService.get(this.config.drug_price_get_all_for_change)
      .pipe(map((drugOrder:Response) =>{
        return drugOrder;
      }));
    }

    changeDrugPirce(dto){
      return this.apiService.post(this.config.drug_price_change,dto)
      .pipe(map((res) => {return res;}))
    }
}

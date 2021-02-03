import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DrugOrderModel } from '../drug-order/drugOrderModel';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DrugOrderService {

  constructor( private apiService: ApiService, private config:ConfigService ) { }



  getDrugList(): Observable<any>{
    return this.apiService.get(this.config.get_drug_for_order)
    .pipe(map((res:Response) =>{
      return res;
    }));
  }


  createOrder(order:DrugOrderModel){
    return this.apiService.post(this.config.drug_order_create,order)
    .pipe(map(drugOrder =>{ 
      return drugOrder;
    }))
  }




}

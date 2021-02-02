import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DrugOrderModel } from '../drug-order/drugOrderModel';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DrugOrderService {

  constructor( private apiService: ApiService) { }



  getDrugList(): Observable<any>{
    return this.apiService.get("http://localhost:8080/api/drug/drugForOrder")
    .pipe(map((res:Response) =>{
      return res;
    }));
  }


  createOrder(order:DrugOrderModel){
    return this.apiService.post("http://localhost:8080/api/drugOrder/createOrder",order)
    .pipe(map(drugOrder =>{ 
      return drugOrder;
    }))
  }




}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DrugOrderModel } from '../drug-order/drugOrderModel';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DrugOrderService {

  constructor(private http: HttpClient, private apiService: ApiService, private config:ConfigService ) { }



  getDrugList(): Observable<any>{
    return this.apiService.get(this.config.get_drug_for_order)
    .pipe(map((res:Response) =>{
      return res;
    }));
  }


  createOrder(order: DrugOrderModel){
    return this.apiService.post(this.config.drug_order_create, order)
    .pipe(map(drugOrder => {
      return drugOrder;
    }))
  }


  getAllOrders = (email: string) => {
    return this.http.get(environment.apiUrl + '/api/drugOrder/all/' + email)
      .pipe(map(response => {
        const orders = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)){
            orders.push(response[key]);
          }
        }
        return orders;
      }));
  }

  
  getDrugOrderByPharmacy(): Observable<any>{
    return this.apiService.get('http://localhost:8080/api/drugOrder/allByPharmacy')
    .pipe(map((res:Response) =>{
      return res;
    }));
  }

  deleteDrugOrder(id){
    return this.apiService.post('http://localhost:8080/api/drugOrder/delete',id) .pipe(map((res) =>{
      return res;
    }));
  }
  
 



}

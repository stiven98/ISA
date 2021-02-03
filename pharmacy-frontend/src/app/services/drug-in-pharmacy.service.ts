import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DrugOrderModel } from '../drug-order/drugOrderModel';
import { DrugInpharmacyChangeModel } from '../ph-admin/drug-in-pharmacy/drugInPharmacyModel';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DrugInPharmacyService {

  constructor(private apiService: ApiService, private config:ConfigService) {}



  getDrugInPharmacy(email:String): Observable<any>{
    return this.apiService.get('http://localhost:8080/api/drugInPharmacy/all/' + email)
    .pipe(map((response:Response) => {
    return response;}))
  }


  addDrugInPharmacy(drugInPharmacy:DrugInpharmacyChangeModel){
    return this.apiService.post('http://localhost:8080/api/drugInPharmacy/add',drugInPharmacy)
    .pipe(map(drugOrder =>{ 
      return drugOrder;
    }))
  }


  removeDrugInPharmacy(drugInPharmacy:DrugInpharmacyChangeModel){
    return this.apiService.post('http://localhost:8080/api/drugInPharmacy/remove',drugInPharmacy)
    .pipe(map(drugOrder =>{ 
      return drugOrder;
    }))
  }

  updateDrugInPharmacy(drugInPharmacy:DrugInpharmacyChangeModel){
    return this.apiService.post('http://localhost:8080/api/drugInPharmacy/update',drugInPharmacy)
    .pipe(map(drugOrder =>{ 
      return drugOrder;
    }))
  }



}
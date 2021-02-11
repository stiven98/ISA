import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private apiService: ApiService, private config:ConfigService ) {
   }

   createPromotion(dto){
     return this.apiService.post('http://localhost:8080/api/promotion/create',dto).pipe(map((res) =>{
      return res;
    }));
  
  }


}
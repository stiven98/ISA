import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  constructor(private apiService: ApiService, private config: ConfigService) { }


  getAllPharmacistRequest():Observable<any>{
    return this.apiService.get('http://localhost:8080/api/vacation/all').pipe(map((res:Response) => {return res;}))
  }


  
}

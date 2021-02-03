import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MedicalStuffService {

  constructor(private api : ApiService, private configService : ConfigService) { }

  getMyPatients() : Observable<any>{
    return this.api.get(this.configService.get_patients_by_medical_stuff).pipe(map(users => {
      return users;
    }));
  }

}

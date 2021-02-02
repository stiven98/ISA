import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MedicalStuffService {

  constructor(private api : ApiService, private configService : ConfigService) { }

  getMyPatients(id: string){
    this.api.get(this.configService.get_patients_by_medical_stuff + id).pipe(map(users =>{
      return users;
    }));
  }

}

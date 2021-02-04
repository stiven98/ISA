import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeesSearchModel } from '../shared/models/EmployeesSearch';
import { PatientClient } from '../shared/models/patientClient';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MedicalStuffService {

  constructor(private api : ApiService, private configService : ConfigService) { }
  
  getMyPatients() : Observable<PatientClient[]>{
    return this.api.get(this.configService.get_patients_by_medical_stuff).pipe(map(users => {
      return users;
    }));
  }

  getAllDermatologist():Observable<any>{
    return this.api.get('http://localhost:8080/api/dermatologist/all')
    .pipe(map((response:Response)=> {
      return response;
    }) )
  }

  getAllDermatologistFromPharmacy(email:String):Observable<any>{
    return this.api.get('http://localhost:8080/api/dermatologist/all/' + email)
    .pipe(map((response:Response)=> {
      return response;
    }))
  }


  searchDermatologist(searchDto:EmployeesSearchModel): Observable<any>{
    return this.api.post('http://localhost:8080/api/dermatologist/searchDermatologist',searchDto)
    .pipe(map((response:Response) => {
      return response;
    }));
  }


}

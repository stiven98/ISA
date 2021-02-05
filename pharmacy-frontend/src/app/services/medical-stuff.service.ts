import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PharmacistCreateModel } from '../ph-admin/create-pharmacist/PharmacistCreater';
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
    return this.api.get(this.configService.get_all_dermatologist)
    .pipe(map((response:Response)=> {
      return response;
    }) )
  }
  getAllPharmacist():Observable<any>{
    return this.api.get(this.configService.get_all_pharmacist)
    .pipe(map((response:Response)=> {
      return response;
    }) )
  }


  getAllDermatologistFromPharmacy(email:String):Observable<any>{
    return this.api.get(this.configService.get_all_dermatologist + '/' + email)
    .pipe(map((response:Response)=> {
      return response;
    }))
  }

  getAllPharmacistFromPharmacy(email:String):Observable<any>{
    return this.api.get(this.configService.get_all_pharmacist + '/'+ email)
    .pipe(map((response:Response)=> {
      return response;
    }))
  }


  searchDermatologist(searchDto:EmployeesSearchModel): Observable<any>{
    return this.api.post(this.configService.search_dermatologist,searchDto)
    .pipe(map((response:Response) => {
      return response;
    }));
  }

  searchPharmacist(searchDto:EmployeesSearchModel): Observable<any>{
    return this.api.post(this.configService.search_pharmacist,searchDto)
    .pipe(map((response:Response) => {
      return response;
    }));
  }


  getMyVacations() : Observable<any[]>{
    return this.api.get(this.configService.vacations).pipe(map(vacations => {
      return vacations;
    }));
  }


  savePharmacist(pharmacist:PharmacistCreateModel){
    return this.api.post('http://localhost:8080/api/pharmacist/add',pharmacist).pipe(map((response:Response) => {
      return response;
    }));
  }
  




}

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
  getMyVacationsByPharmacy(id: any) : Observable<any[]>{
    return this.api.get(this.configService.vacations_by_pharmacy + id).pipe(map(vacations => {
      return vacations;
    }));
  }

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

  getMyPharmacies() : Observable<any[]>{
    return this.api.get(this.configService.get_my_pharmacies).pipe(map(pharmacies => {
      return pharmacies;
    }));
  }

  sendVacationRequest(request){
    return this.api.post(this.configService.request_vacation, request).pipe(map(response => {
      return response;
    }));
  }

  savePharmacist(pharmacist:PharmacistCreateModel){
    return this.api.post(this.configService.add_pharmacist,pharmacist).pipe(map((response:Response) => {
      return response;
    }));
  }

  deletePharmacist(pharmacist){
    return this.api.post(this.configService.delete_pharmacist,{"phAdminEmail":pharmacist.emailPhAdmin, "employeeEmail":pharmacist.email})
    .pipe(map((response) => {return response;}));
  }
  
  deleteDErmatologist(dermatologist){
    return this.api.post(this.configService.delete_dermatologist,{"phAdminEmail":dermatologist.emailPhAdmin, "employeeEmail":dermatologist.email})
    .pipe(map((response) => {return response;}));
  }
  

  getAllDermatologistFromOtherPharmacy():Observable<any>{
    return this.api.get(this.configService.get_dermatologist_from_other_pharmacy)
    .pipe(map((response:Response)=> {
      return response;
    }) )
  }

  addDermatologistInPharmacy(pharmacist:PharmacistCreateModel){
    return this.api.post(this.configService.add_dermatologist_in_pharmacy,pharmacist)
    .pipe(map((response)=> {
      return response;
    }) )
  }




}

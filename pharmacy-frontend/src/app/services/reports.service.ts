import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private apiService: ApiService, private config: ConfigService) { }


  getReportMarks():Observable<any>{
    return this.apiService.get("http://localhost:8080/api/report/marks").pipe(map((res:Response) => {return res;}))
  }

  gerReportYers():Observable<any>{
    return this.apiService.get("http://localhost:8080/api/report/yearsReportExamination").pipe(map((res:Response) => {return res;}))
  }


  getReportMonth(month):Observable<any>{
    return this.apiService.get("http://localhost:8080/api/report/monthly/" + month).pipe(map((res:Response) => {return res;}))
  }


  gerReportYersDrug():Observable<any>{
    return this.apiService.get("http://localhost:8080/api/report/yearsReportDrug").pipe(map((res:Response) => {return res;}))
  }


  getReportMonthDrug(month):Observable<any>{
    return this.apiService.get("http://localhost:8080/api/report/monthlyDrug/" + month).pipe(map((res:Response) => {return res;}))
  }


  getReportIcnome(periode):Observable<any>{
    return this.apiService.post("http://localhost:8080/api/report/income" ,periode).pipe(map((res:Response) => {return res;}))
  }



}

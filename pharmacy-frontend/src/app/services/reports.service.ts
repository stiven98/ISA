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


}

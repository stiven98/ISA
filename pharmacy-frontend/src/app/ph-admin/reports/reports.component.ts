import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  makrs = {
    pharmacyName: '',
    averageMarkPharmacy: 0,
    employeeDTOS : []
  }
  fetchData = false;


  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  quartal = ['Jan-Mar', 'Apr-June', 'July-Sept', 'Oct-Dec'];
  yersRepot:number[] = [];
  quartalReport:number[] = [];
  view = 1; /// 0 years , 1 quartal, 2 month
  view2 = 1; /// 0 years , 1 quartal, 2 month

  yersRepotDrug:number[] = [];
  quartalReportDrug:number[] = [];


  monthly = {
    numberOfExamination : [],
    days : []
  }

  monthlyDrug = {
    numberOfExamination : [],
    days : []
  }



  constructor(private reportsService:ReportsService) { }

  ngOnInit(): void {
    this.fetchData = true;
    this.reportsService.getReportMarks().subscribe((res) => this.makrs = res );
    this.reportsService.gerReportYers().subscribe((res)=>{ 
      let temp = res;
      for(let a of temp){
        this.yersRepot.push(a);
      }
      let i =0
      let sum:number = 0
      for(let s of temp){
        if(i<3){
          sum += s;
        }else{
          this.quartalReport.push(sum);
          sum = 0;
          i=0;
        }
        i++;
      }
    });

    this.reportsService.getReportMonth(2).subscribe((res)=> {
      this.monthly = res;

    })



    this.reportsService.gerReportYersDrug().subscribe((res)=>{
      let temp = res;
      for(let a of temp){
        this.yersRepotDrug.push(a);
      }
      let i =0
      let sum:number = 0
      for(let s of temp){
        if(i<3){
          sum += s;
        }else{
          this.quartalReportDrug.push(sum);
          sum = 0;
          i=0;
        }
        i++;
      }
      
    })



    this.fetchData = false;
  }


  condition(derm){
    return derm.employeeType == 'Dermatologist';
  }
  
  month(){
    return this.view == 0;
  }

  monthDrug(){
    return this.view2 == 0;
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = this.months;
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: this.yersRepot, label: 'Years report examination',},
  ];


  onChangeSelectedCity(event){
    this.reportsService.getReportMonth(event.target.value).subscribe((res)=> {
      this.monthly = res;
      this.view = 0;
      this.barChartLabels = this.monthly.days;
      this.barChartData = [
        {data: this.monthly.numberOfExamination, label: 'Month report examination',},
      ];
    })

    
  }

  onChangeSelectedDrug(event){
    this.reportsService.getReportMonthDrug(event.target.value).subscribe((res)=> {
      this.monthlyDrug = res;
      this.view = 0;
      this.barChartLabels2 = this.monthlyDrug.days;
      this.barChartData2 = [
        {data: this.monthlyDrug.numberOfExamination, label: 'Month report examination',},
      ];
    })


  }



  switchExamination(){
    switch(this.view){
        case 0:{ 
          this.view = 1;

          this.barChartLabels = this.months;
          this.barChartData = [
            {data: this.yersRepot, label: 'Years report examination ',},
          ];
          
        
        break;}
        case 1:{ 
        this.view = 2;

        this.barChartLabels = this.quartal;
        this.barChartData = [
          {data: this.quartalReport, label: 'Quartal report examination',},
        ];
        
        break;}
        case 2: {
        this.view = 0;
        this.barChartLabels = this.monthly.days;
        this.barChartData = [
          {data: this.monthly.numberOfExamination, label: 'Month report examination',},
        ];

        break;}

    }
  }


  public barChartOptions2 = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels2 = this.months;
  public barChartType2 = 'bar';
  public barChartLegend2= true;
  public barChartData2 = [
    {data: this.yersRepotDrug, label: 'Years report drug',},
  ];



  switchDrug(){
    switch(this.view2){
        case 0:{ 
          this.view2 = 1;

          this.barChartLabels2 = this.months;
          this.barChartData2 = [
            {data: this.yersRepotDrug, label: 'Years report drug',},
          ];
          
        
        break;}
        case 1:{ 
        this.view2 = 2;

        this.barChartLabels2 = this.quartal;
        this.barChartData2 = [
          {data: this.quartalReportDrug, label: 'Quartal report drug',},
        ];
        
        break;}
        case 2: {
        this.view2 = 0;
        this.barChartLabels2 = this.monthlyDrug.days;
        this.barChartData2 = [
          {data: this.monthlyDrug.numberOfExamination, label: 'Month report drug',},
        ];

        break;}

    }
  }



}


import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeUserModel } from '../change-account-info/changeUser.model';
import { DrugPriceService } from '../services/drug-price.service';
import { ExaminationPriceService } from '../services/examination-price.service';
import { MedicalStuffService } from '../services/medical-stuff.service';
import { UserService } from '../services/user.service';
import { DrugPriceModel } from './drug-in-pharmacy/drugPriceModel';
import { ExaminationPriceModel } from './drug-in-pharmacy/examinationPriceModel';

@Component({
  selector: 'app-ph-admin',
  templateUrl: './ph-admin.component.html',
  styleUrls: ['./ph-admin.component.css'],
  styles: [`
  .custom-day {
    text-align: center;
    padding: 0.185rem 0.25rem;
    display: inline-block;
    height: 2rem;
    width: 2rem;
  }
  .custom-day.focused {
    background-color: #e6e6e6;
  }
  .custom-day.range, .custom-day:hover {
    background-color: rgb(2, 117, 216);
    color: white;
  }
  .custom-day.faded {
    background-color: rgba(2, 117, 216, 0.5);
  }
`]
})
export class PhAdminComponent implements OnInit {
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  phAdmin: ChangeUserModel = new ChangeUserModel();
  fetchData = false;
  dermatologist = []
  drugPrice = [];
  f = false;
  fExamination = false;
  change = false;
  examinationFlag = false;
  closeResult = '';
  changeExaminationPrice = []
  examinationPRice:ExaminationPriceModel = new ExaminationPriceModel();
  constructor(private userService: UserService, private medicalStufService:MedicalStuffService,
    private drugPriceServise: DrugPriceService,
    private modalService:NgbModal,
    private calendar: NgbCalendar,
    private examinationPriceService: ExaminationPriceService) {
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);


     }

  ngOnInit(): void {
    this.fetchData = true;
    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
    this.userService.getMyInfo().subscribe(phAdmin =>{ this.phAdmin = phAdmin
    this.medicalStufService.getAllDermatologistFromPharmacy(this.phAdmin.email).subscribe((list) => {
      this.dermatologist = list;
    })
    });

    this.drugPriceServise.getAllForChange().subscribe((res) => {this.drugPrice = res;
      for(let a of this.drugPrice){  
        a.startDate = new Date(a.startDate).toLocaleDateString();
        a.endDate = new Date(a.endDate).toLocaleDateString();
      }
    
    });

    this.examinationPriceService.getAllForChange().subscribe((res) => {
      this.changeExaminationPrice = res;
      for(let a of this.changeExaminationPrice){  
        a.startDate = new Date(a.startDate).toLocaleDateString();
        a.endDate = new Date(a.endDate).toLocaleDateString();
      }
    })


    this.fetchData = false;
  }

  flag(){
    this.f = true;
  }
  flagExamination(){
    this.fExamination = true;
  }

  changPrice(){
    this.change = true;
  }

  changExaminationPrice(){
    this.examinationFlag = true;
  } 

  save(dp){
    let d = new DrugPriceModel();
    d.drugPrice = dp.drugPrice;
    d.price = dp.price;

    let dto = {
      price:dp.price,
      drugPrice:dp.drugPrice
    }

    this.drugPriceServise.changeDrugPirce(dto).subscribe((res)=> alert(res.result));
  }


  saveExaminationPrice(examinationPrice){
    examinationPrice.startDate = new Date();
    examinationPrice.endDate = new Date();
    this.examinationPriceService.changeExaminationPrice(examinationPrice).subscribe((res) => alert(res.result));

  }



  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }





  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }


  onChangeSelectedDate(event){
    alert(event.target.value);
    this.examinationPRice.examinationType = event.target.value;
  }

  createExaminationPrice(){
    if(this.fromDate != undefined){
      let d = this.fromDate.year + "-" + this.fromDate.month + "-" + this.fromDate.day;
      this.examinationPRice.startDate = new Date(Date.parse(d));
    }else{
      alert("Choose day");
      return;
    }

    if(this.toDate != undefined){
      let d = this.toDate.year + "-" + this.toDate.month + "-" + this.toDate.day;
      this.examinationPRice.endDate = new Date(Date.parse(d));
    }else{
      alert("Choose day");
      return;
    }

    this.examinationPriceService.createExaminationPrice(this.examinationPRice).subscribe((res) => alert(res.result));
  }





}

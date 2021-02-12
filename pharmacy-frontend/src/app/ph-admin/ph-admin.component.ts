import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeUserModel } from '../change-account-info/changeUser.model';
import { DrugOrderService } from '../services/drug-order.service';
import { DrugPriceService } from '../services/drug-price.service';
import { ExaminationPriceService } from '../services/examination-price.service';
import { MedicalStuffService } from '../services/medical-stuff.service';
import { PharmacyService } from '../services/pharmacy.service';
import { PromotionService } from '../services/promotion.service';
import { UserService } from '../services/user.service';
import { DrugPriceModel } from './drug-in-pharmacy/drugPriceModel';
import { ExaminationPriceModel } from './drug-in-pharmacy/examinationPriceModel';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import {OSM, Vector as VectorSource} from 'ol/source';
import Point from 'ol/geom/Point';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import Feature from 'ol/Feature';
import Geocoder from 'ol-geocoder'

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
  waitingForOffers: boolean = true;
  processed: boolean = true;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  phAdmin: ChangeUserModel = new ChangeUserModel();
  fetchData = false;
  dermatologist = []
  drugPrice = [];
  drugOrderFlag = false;
  f = false;
  fExamination = false;
  change = false;
  examinationFlag = false;
  changeDrugOrder = false;
  closeResult = '';
  changeExaminationPrice = []
  drugOrderPharmacy = [];
  examinationPRice:ExaminationPriceModel = new ExaminationPriceModel();
  filterList = [];

  promotion = {
    id : '',
    startDate : new Date(),
    endDate : new Date(),
    text : ''
  }

  pharmacy = {
    pharmacyID:'',
    text: '',
    name: ''
  }

  map;

  xCoordinate = 0;
  yCoordinate = 0;


  constructor(private userService: UserService, private medicalStufService:MedicalStuffService,
    private drugPriceServise: DrugPriceService,
    private modalService:NgbModal,
    private calendar: NgbCalendar,
    private examinationPriceService: ExaminationPriceService,
    private drugOrderService:DrugOrderService,
    private promotionService:PromotionService,
    private pharmacyService: PharmacyService) {
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


    this.drugOrderService.getDrugOrderByPharmacy().subscribe((res) => {
    this.drugOrderPharmacy = res;
    for(let a of this.drugOrderPharmacy){  
      a.deadline = new Date(a.deadline).toLocaleDateString();
      this.filterList.push(a);
    }
    });

    
    this.pharmacyService.getChangePharmacy().subscribe((res) => {
      this.pharmacy = res;
    })




    this.intMap();



    this.fetchData = false;
  }

  flag(){
    this.f = true;
  }
  flagExamination(){
    this.fExamination = true;
  }

  flagDrugOrder(){
    this.drugOrderFlag = true;
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
    let exPrice = new ExaminationPriceModel();
    exPrice.examinationPriceId = examinationPrice.examinationPriceId;
    exPrice.price = examinationPrice.price;
    exPrice.examinationType = examinationPrice.examinationType;
    this.examinationPriceService.changeExaminationPrice(exPrice).subscribe((res) => alert(res.result));

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



  onChangeCheckBox() {
    this.filterList = [];

    if(this.waitingForOffers && this.processed){
      this.filterList = this.drugOrderPharmacy;
      return;
    }

    if(!this.waitingForOffers && !this.processed){
      this.filterList
      return;
    }

    for(let drugITem of this.drugOrderPharmacy){
      if(this.waitingForOffers && !this.processed && (drugITem.drugOrderStatus == 'waitingForOffers')){
          this.filterList.push(drugITem);
      }
      else if(!this.waitingForOffers && this.processed && (drugITem.drugOrderStatus == 'processed')){
        this.filterList.push(drugITem);
      }
    }
  }



  s(dp){
    return dp.drugOrderStatus == 'processed';
  }



  changDrugOrder(){
    this.changeDrugOrder = true;
  }



  changeAndSaveDrugOrder(dp){
    dp.deadline = new Date();
    this.drugOrderService.changeDrugOrder(dp).subscribe((res) => alert(res.result));

  }


  createPromotion(){
    if(this.fromDate != undefined){
      let d = this.fromDate.year + "-" + this.fromDate.month + "-" + this.fromDate.day;
      this.promotion.startDate = new Date(Date.parse(d));
    }else{
      alert("Choose day");
      return;
    }

    if(this.toDate != undefined){
      let d = this.toDate.year + "-" + this.toDate.month + "-" + this.toDate.day;
      this.promotion.endDate = new Date(Date.parse(d));
    }else{
      alert("Choose day");
      return;
    }

    
    this.promotionService.createPromotion(this.promotion).subscribe((res)=> alert(res.result));
  }

  changePh(){
    this.pharmacyService.changePharmacy(this.pharmacy).subscribe((res) => {
      alert(res.result);
    })

  }


  intMap(){
    
    var place = [0,0];

    var source = new VectorSource({
      features : [new Feature(new Point( olProj.fromLonLat(place)))]
    });
    var style = new Style({
      fill: new Fill({
        color: 'blue',
      }),
      stroke: new Stroke({
        color: 'black',
        width: 1.2,
      }),
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({
          color: 'red',
        }),
        stroke: new Stroke({
          color: 'black',
          width: 1,
        }),
      }),
    });
    var vectorLayer = new VectorLayer({
      source: source,
      visible : true,
      style: style,
    });

      this.map = new Map({
        target: 'hotel_maps',
        layers: [
          new TileLayer({
            source: new OSM()
          }),
          vectorLayer
        ],
        view: new View({
          center: olProj.fromLonLat(place),
          zoom: 18
        })
      });

      var geocoder = new Geocoder('nominatim', {
        provider: 'osm',
      lang: 'en',
      placeholder: 'Search for ...',
      limit: 5,
      debug: false,
      autoComplete: true,
      keepOpen: true
    });
    this.map.addControl(geocoder);

	geocoder.on('addresschosen',(event) => {
				
		
				this.xCoordinate = event.coordinate[0];
				this.yCoordinate = event.coordinate[1];
			});
  }

  saveMapLOcation(){
   let dto = {
      pharmacyID : this.pharmacy.pharmacyID,
      geographicalWidth: this.xCoordinate,
      geographicalLength: this.yCoordinate
    }
    
    this.pharmacyService.changeLocationMap(dto).subscribe((res) => {alert(res.result);
    })
  }


}


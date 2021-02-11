import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PharmacyService} from '../../services/pharmacy.service';
import {Pharmacy} from '../../shared/models/Pharmacy';
import {AuthService} from '../../services/auth.service';
import {PatientService} from '../../services/patient.service';
import {UserService} from '../../services/user.service';
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
  selector: 'app-pharmacy-home',
  templateUrl: './pharmacy-home.component.html',
  styleUrls: ['./pharmacy-home.component.css']
})
export class PharmacyHomeComponent implements OnInit {
  name: string;
  pharmacists = [];
  dermatologists = [];
  drugs = [];
  pharmacy: Pharmacy = new Pharmacy();
  email: string;
  role = '';
  isSubscribed: boolean;
  fetchData = true;


  map;

  dto = {
    pharmacyID : '',
    geographicalWidth: 0,
    geographicalLength: 0
  }

  place = [  this.dto.geographicalWidth,  this.dto.geographicalLength];
  constructor(private route: ActivatedRoute,
              private pharmacyService: PharmacyService,
              public authService: AuthService,
              private patientService: PatientService,
              private userService: UserService) {
    this.name = route.snapshot.params[`name`];
  }

  ngOnInit(): void {

    this.pharmacyService.findByName(this.name).subscribe(response => {
      this.pharmacy = response;

      this.userService.getMyInfo().subscribe((user) => {
        this.email = user.email;
        this.role = user.role;
        this.patientService.isSubscribedPharmacy(user.email, this.pharmacy.id).subscribe((response) => {
          this.isSubscribed = (response === true);
        });
      });

      for ( let i = 0; i < this.pharmacy.pharmacists.length; i++) {
        this.pharmacyService.findMedicalStuffById(this.pharmacy.pharmacists[i]).subscribe((pharmacist) => {
          this.pharmacists.push(pharmacist);

        });
      }
      for ( let i = 0; i < this.pharmacy.dermatologists.length; i++) {
        this.pharmacyService.findMedicalStuffById(this.pharmacy.dermatologists[i]).subscribe((dermatologist) => {
          this.dermatologists.push(dermatologist);

        });
      }
      this.pharmacyService.findDrugById(this.pharmacy.id).subscribe((drug) => {
          this.drugs = drug;
        });

      this.pharmacyService.getLocationMap(this.route.snapshot.params[`name`]).subscribe((res) => {let a = res;
        this.dto.geographicalWidth = a.geographicalWidth;
        this.dto.geographicalLength = a.geographicalLength;
        this.place = [  this.dto.geographicalWidth,  this.dto.geographicalLength];

        var source = new VectorSource({
          features : [new Feature(new Point(this.place))]
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
            target: 'hotel_map',
            layers: [
              new TileLayer({
                source: new OSM()
              }),
              vectorLayer
            ],
            view: new View({
              center: this.place,
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



      })

      this.fetchData = false;
    });



 

 
        
        

  }


  subscribeOnPharmacy = () => {
    this.patientService.subscribePharmacy(this.email, this.pharmacy.id).subscribe((response) => {
      this.isSubscribed = true;
    });
  }

  unSubscribeOnPharmacy = () => {
    this.patientService.unsubscribePharmacy(this.email, this.pharmacy.id).subscribe((response) => {
      this.isSubscribed = false;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {QrcodeService} from '../services/qrcode.service';
import {ErecipeService} from '../services/erecipe.service';


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {

  drugs: any[];
  pharmacies: any[];
  sortedList: any [];
  isLoaded: boolean;
  selectedType: string;
  email: string;


  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private qrcodeService: QrcodeService,
              private erecipeService: ErecipeService) { }

  ngOnInit(): void {
    this.selectedType = 'ByNone';
    this.isLoaded = false;
    this.drugs = [];
    this.sortedList = [];
    this.pharmacies = [];
    this.userService.getMyInfo().subscribe(user => {
      this.email = user.email;
      if (this.authService.getRole() !== 'ROLE_PATIENT') {
        this.router.navigate(['403']);
      }
    }, error => {
      this.router.navigate(['login']);
    });

  }

  processFile = (imageInput: any) => {
    const file: File = imageInput.files[0];

    this.qrcodeService.uploadQrCode(file).subscribe(response => {

      this.drugs = response[0];

      this.pharmacies = response[1];
      this.sortedList = response[1];

      this.isLoaded = true;
      alert('Correct QR code!');
    }, error => {
      this.drugs = [];
      this.pharmacies = [];
      this.isLoaded = false;
      alert('Wrong QR code!');
    });



  }

  sortApply = () => {
    if (this.selectedType === 'byNone') {
      this.sortedList = this.pharmacies;
    } else if (this.selectedType === 'byPrice') {
      this.sortedList = this.pharmacies.sort(this.comparePrice);
    } else if (this.selectedType === 'byAverageMark') {
      this.sortedList = this.pharmacies.sort(this.compareAverageMark);
    } else if (this.selectedType === 'byLocation') {
      this.sortedList = this.pharmacies.sort(this.compareLocation);
    } else if (this.selectedType === 'byName') {
      this.sortedList = this.pharmacies.sort(this.compareName);
    }

  }

  compareName = (a, b) => {
    return (a.name).localeCompare(b.name);
  }

  compareLocation = (a, b) => {
    return (a.location.address.street + '' + a.location.address.number).localeCompare(b.location.address.street + ' ' + b.location.address.number);
  }

  compareAverageMark = ( a, b ) => {
    if ( a.averageMark < b.averageMark ){
      return -1;
    }
    if ( a.averageMark > b.averageMark ){
      return 1;
    }
    return 0;
  }

  comparePrice = ( a, b ) => {
    if ( a.price < b.price ){
      return -1;
    }
    if ( a.price > b.price ){
      return 1;
    }
    return 0;
  }


  onChange = (event) => {
    this.selectedType = event.target.value;
  }

  createERecipe = (item) => {
    this.erecipeService.addERecepe({qrCodeItems: this.drugs, email: this.email, pharmacyId: item.id}).subscribe(() => {
      alert('Success!');
      this.ngOnInit();
    });
  }

}

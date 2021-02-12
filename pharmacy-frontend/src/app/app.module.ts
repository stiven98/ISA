import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxLoadingXConfig, NgxLoadingXModule, SPINNER} from 'ngx-loading-x';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { HomeComponent } from './home/home.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PharmacyHomeComponent } from './pharmacy/pharmacy-home/pharmacy-home.component';
import { PhAdminComponent } from './ph-admin/ph-admin.component';
import { ChangeAccountInfoComponent } from './change-account-info/change-account-info.component';
import { DermatologistHomeComponent } from './dermatologist-home/dermatologist-home.component';
import { TokenInterceptor } from './interceptor/TokenInterceptor';
import { DermatologistsGuard } from './guard/dermatologists.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PatientComponent } from './patient/patient.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SysAdminComponent } from './sys-admin/sys-admin.component';
import { NewPharmacyComponent } from './new-pharmacy/new-pharmacy.component';
import { NewAdminComponent } from './new-admin/new-admin.component';
import { MedicalStuffClientsComponent } from './medical-stuff-clients/medical-stuff-clients.component';
import { DrugsComponent } from './drugs/drugs.component';
import { DrugOrderComponent } from './drug-order/drug-order.component';
import { DrugReservationComponent } from './drug-reservation/drug-reservation.component';
import { PhAdminGuard } from './guard/ph-admin.guard';
import { NewDermatologistComponent } from './new-dermatologist/new-dermatologist.component';
import { NewSupplierComponent } from './new-supplier/new-supplier.component';
import { AuthGuard } from './guard/auth.guard';
import { DrugInPharmacyComponent } from './ph-admin/drug-in-pharmacy/drug-in-pharmacy.component';
import { NewDrugComponent } from './new-drug/new-drug.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeaderDirective } from './shared/utilities/ngbd-sortable-header.directive';
import { SeeAllDermatologistComponent } from './see-all-dermatologist/see-all-dermatologist.component';
import { WorkCalendarComponent } from './work-calendar/work-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SeeAllPharmacistComponent } from './see-all-pharmacist/see-all-pharmacist.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { VacationRequestComponent } from './vacation-request/vacation-request.component';
import { CreatePharmacistComponent } from './ph-admin/create-pharmacist/create-pharmacist.component';
import { StartExaminationPageComponent } from './start-examination-page/start-examination-page.component';
import { ExaminationDataComponent } from './examination-data/examination-data.component';
import {PatientMarksComponent} from './patient-marks/patient-marks.component';
import { PharmacistConsultationComponent } from './pharmacist-consultation/pharmacist-consultation.component';
import { AvailablePharmacistsComponent } from './pharmacist-consultation/available-pharmacists/available-pharmacists.component';
import { SubscribedPharmacyComponent } from './subscribed-pharmacy/subscribed-pharmacy.component';
import { AddDermatologistInPharmacyComponent } from './ph-admin/add-dermatologist-in-pharmacy/add-dermatologist-in-pharmacy.component';
import { CreateExaminationComponent } from './ph-admin/create-examination/create-examination.component';
import { LoyaltyProgramComponent } from './loyalty-program/loyalty-program.component';

import { EmployeeSchedulingComponent } from './employee-scheduling/employee-scheduling.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { SeeAllOfferComponent } from './ph-admin/see-all-offer/see-all-offer.component';
import { DermatologistExaminationComponent } from './dermatologist-examination/dermatologist-examination.component';
import { VacationComponent } from './vacation/vacation.component';
import { PharmacistHomeComponent } from './pharmacist-home/pharmacist-home.component';
import { PharmacistsGuard } from './guard/pharmacists.guard';
import { EmployeeGuard } from './guard/employee.guard';
import { ReportsComponent } from './ph-admin/reports/reports.component';
import { ChartsModule } from 'ng2-charts';
import { MedicamentIssuingComponent } from './medicament-issuing/medicament-issuing.component';
import { QrCodeComponent } from './qr-code/qr-code.component';

const appRoutes: Routes = [
  { path: '', component: PharmacyComponent },
  { path: 'login', component: SingInComponent },
  { path: 'registration', component: SingUpComponent },
  { path: 'pharmacy', component: PharmacyComponent },
  { path: 'pharmacy-home/:name', component: PharmacyHomeComponent },
  { path: 'dermatologist-examination/:name', component: DermatologistExaminationComponent},
  { path: 'available-pharmacists/:name/:date/:time', component: AvailablePharmacistsComponent },
  { path: 'drug-reservation/:drug', component: DrugReservationComponent},
  { path: 'phAdmin', component: PhAdminComponent},
  { path: 'changeAccountInfo' , component: ChangeAccountInfoComponent, canActivate: [AuthGuard] },
  { path: 'changePassword' , component: ChangePasswordComponent},
  { path: 'patient-marks', component: PatientMarksComponent},
  { path: 'dermatologist', component: DermatologistHomeComponent, canActivate: [DermatologistsGuard],
  children : [
    { path: 'changeAccountInfo', component: ChangeAccountInfoComponent },
    { path: 'patients', component: MedicalStuffClientsComponent },
    { path: 'workCalendar', component: WorkCalendarComponent },
    { path: 'vacationRequest', component: VacationRequestComponent },
    { path: '**', redirectTo: 'changeAccountInfo'}
  ]
  },
  { path: 'pharmacist', component: PharmacistHomeComponent, canActivate: [PharmacistsGuard],
  children : [
    { path: 'changeAccountInfo', component: ChangeAccountInfoComponent },
    { path: 'patients', component: MedicalStuffClientsComponent },
    { path: 'workCalendar', component: WorkCalendarComponent },
    { path: 'vacationRequest', component: VacationRequestComponent },
    { path: 'medicamentIssuing', component: MedicamentIssuingComponent },
    { path: '**', redirectTo: 'changeAccountInfo'}
  ]
  },
  { path: 'patient', component: PatientComponent},
  { path: 'newDermatologist', component: NewDermatologistComponent},
  { path: 'newSupplier', component: NewSupplierComponent },
  { path: 'newPharmacy', component: NewPharmacyComponent},
  { path: 'newAdmin', component: NewAdminComponent},
  { path: 'allOrders', component: AllOrdersComponent},
  { path: 'subscribedPharmacy', component: SubscribedPharmacyComponent },
  { path: 'myOffers', component: MyOffersComponent},
  { path: 'drugs', component: DrugsComponent},
  { path: 'QRcode', component: QrCodeComponent},
  { path: 'complaint', component: ComplaintComponent },
  { path: '404', component: NotFoundComponent},
  { path: '403', component: ForbiddenComponent},
  { path: 'loyaltyProgram', component: LoyaltyProgramComponent},
  { path: 'drugOrder', component: DrugOrderComponent, canActivate: [PhAdminGuard]},
  { path: 'drugInPharmacy', component: DrugInPharmacyComponent, canActivate: [PhAdminGuard]},
  { path: 'newDrug', component: NewDrugComponent },
  { path: 'allDermatologist', component: SeeAllDermatologistComponent},
  { path: 'allPharmacist', component: SeeAllPharmacistComponent},
  { path: 'pharmacist-consultation', component: PharmacistConsultationComponent},
  { path: 'createPharmacist', component: CreatePharmacistComponent, canActivate: [PhAdminGuard]},
  { path: 'examination/:examinationId', component: StartExaminationPageComponent, canActivate: [EmployeeGuard]},
  { path: 'examinationData/:examinationId', component: ExaminationDataComponent, canActivate: [EmployeeGuard]},
  { path: 'addDermatologistInPharmacy', component: AddDermatologistInPharmacyComponent, canActivate: [PhAdminGuard]},
  { path: 'createExamination/:email', component: CreateExaminationComponent, canActivate: [PhAdminGuard]},
  { path: 'acceptDrugOffer/:id', component: SeeAllOfferComponent, canActivate: [PhAdminGuard]},
  { path: 'vacation', component: VacationComponent},
  { path: 'reports', component: ReportsComponent, canActivate: [PhAdminGuard]},


  //ovo mora da bude poslednje!!!!!!!
  { path: '**', redirectTo: '/404'}

];

const ngxLoadingXConfig: NgxLoadingXConfig = {
  spinnerType: SPINNER.circleSpinner,
  spinnerColor: '#1a1a1a'
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SingInComponent,
    SingUpComponent,
    HomeComponent,
    PharmacyComponent,
    PharmacyHomeComponent,
    PhAdminComponent,
    ChangeAccountInfoComponent,
    DermatologistHomeComponent,
    ForbiddenComponent,
    NotFoundComponent,
    PatientComponent,
    ChangePasswordComponent,
    SysAdminComponent,
    NewPharmacyComponent,
    NewAdminComponent,
    MedicalStuffClientsComponent,
    DrugsComponent,
    DrugOrderComponent,
    DrugReservationComponent,
    NewDermatologistComponent,
    NewSupplierComponent,
    DrugInPharmacyComponent,
    NewDrugComponent,
    DrugInPharmacyComponent,
    NgbdSortableHeaderDirective,
    SeeAllDermatologistComponent,
    WorkCalendarComponent,
    SeeAllPharmacistComponent,
    PatientMarksComponent,
    AllOrdersComponent,
    MyOffersComponent,
    VacationRequestComponent,
    CreatePharmacistComponent,
    AddDermatologistInPharmacyComponent,
    CreateExaminationComponent,
    StartExaminationPageComponent,
    ExaminationDataComponent,
    PharmacistConsultationComponent,
    AvailablePharmacistsComponent,
    SubscribedPharmacyComponent,
    AddDermatologistInPharmacyComponent,
    LoyaltyProgramComponent,
    ComplaintComponent,
    DermatologistExaminationComponent,
    EmployeeSchedulingComponent,
    ComplaintComponent,
    SeeAllOfferComponent,
    PharmacistHomeComponent,
    MedicamentIssuingComponent,
    VacationComponent,
    PharmacistHomeComponent,
    ReportsComponent,
    QrCodeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgxLoadingXModule.forRoot(ngxLoadingXConfig),
    FormsModule,
    NgbModule,
    ChartsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),

  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxLoadingXConfig, NgxLoadingXModule, POSITION, SPINNER} from 'ngx-loading-x';
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


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: SingInComponent },
  { path: 'registration', component: SingUpComponent },
  { path: 'pharmacy', component: PharmacyComponent },
  { path: 'pharmacy-home/:name', component: PharmacyHomeComponent },
  { path: 'phAdmin', component: PhAdminComponent},
  { path: 'changeAccountInfo/:id' , component: ChangeAccountInfoComponent},
  { path: 'dermatologist', component: DermatologistHomeComponent, canActivate: [DermatologistsGuard]},
  { path: '404', component: NotFoundComponent},
  { path: '403', component: ForbiddenComponent},
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
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgxLoadingXModule.forRoot(ngxLoadingXConfig),
    FormsModule
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

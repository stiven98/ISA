import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxLoadingXConfig, NgxLoadingXModule, POSITION, SPINNER} from 'ngx-loading-x';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { HomeComponent } from './home/home.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PharmacyHomeComponent } from './pharmacy/pharmacy-home/pharmacy-home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: SingInComponent },
  { path: 'registration', component: SingUpComponent },
  { path: 'pharmacy', component: PharmacyComponent },
  { path: 'pharmacy-home/:name', component: PharmacyHomeComponent }

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
    PharmacyHomeComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

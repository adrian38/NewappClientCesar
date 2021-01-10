import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';

//Services
import {AuthOdooService} from './services/auth-odoo.service';
import {AuthGuardService} from './services/auth-guard.service';
import {TaskOdooService} from './services/task-odoo.service';
import {ObtSubSService} from './services/obt-sub-s.service';

//import {ButtonModule} from 'primeng/button';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LOCALE_ID } from '@angular/core';
import localeEsAr from '@angular/common/locales/es-AR';
registerLocaleData(localeEsAr, 'es')
import { registerLocaleData } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

registerLocaleData(localeEsAr);

import { AgmCoreModule } from '@agm/core';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserAnimationsModule,
    BrowserModule, 
    ComponentsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ButtonModule, 
    ToastModule,
    CommonModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyBXq33cjYMCezL6xP-vo3m-qWQ5U9gRTfQ'
    }) 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthOdooService,
    HttpClientModule,
    AuthGuardService,
    TaskOdooService,
    ObtSubSService,
    {
      provide: 
      LOCALE_ID, 
      useValue:'es'
    },
    DatePipe,
    MessageService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

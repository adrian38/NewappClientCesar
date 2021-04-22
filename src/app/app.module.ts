///angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { DatePipe } from '@angular/common'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { LOCALE_ID } from '@angular/core';

import localeEsAr from '@angular/common/locales/es-AR';
registerLocaleData(localeEsAr, 'es')
import { registerLocaleData } from '@angular/common';

/////////////////////////////////////////////////////////


//ionic
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


////////////////////////////////////////////



//Services
import {AuthOdooService} from './services/auth-odoo.service';
import {AuthGuardService} from './services/auth-guard.service';
import {TaskOdooService} from './services/task-odoo.service';
import {ObtSubSService} from './services/obt-sub-s.service';
import { SignUpOdooService } from 'src/app/services/signup-odoo.service';
import { LocationService } from 'src/app/services/location.service';

///////////////////////////////////////////////////////////////

////////prime
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
/////////////////////////////////////////////

///////google
import { AgmCoreModule } from '@agm/core';
/////////////////////////////////////////

///////internet


/////////////////////////////////////


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
    AuthGuardService,
    TaskOdooService,
    ObtSubSService,
    SignUpOdooService,
    LocationService,
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

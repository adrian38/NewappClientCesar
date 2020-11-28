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

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ButtonModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthOdooService,
    HttpClientModule,
    AuthGuardService,
    TaskOdooService,
    ObtSubSService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

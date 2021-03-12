import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfertasPageRoutingModule } from './ofertas-routing.module';

import { OfertasPage } from './ofertas.page';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {RatingModule} from 'primeng/rating';

import {GalleriaModule} from 'primeng/galleria';
import {LightboxModule} from 'primeng/lightbox';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfertasPageRoutingModule,
    ToastModule,
    DialogModule,
    RatingModule,
    LightboxModule,
    GalleriaModule,
    ComponentsModule
  
  
  ],
  declarations: [OfertasPage],
  providers: [
    ScreenOrientation
 ]
  
})
export class OfertasPageModule {}

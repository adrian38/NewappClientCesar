import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfertasPageRoutingModule } from './ofertas-routing.module';

import { OfertasPage } from './ofertas.page';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {RatingModule} from 'primeng/rating';


import {LightboxModule} from 'primeng/lightbox';


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
  
  
  ],
  declarations: [OfertasPage]
  
})
export class OfertasPageModule {}

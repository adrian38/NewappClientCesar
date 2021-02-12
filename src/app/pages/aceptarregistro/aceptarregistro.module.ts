import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AceptarregistroPageRoutingModule } from './aceptarregistro-routing.module';
import {ToastModule} from 'primeng/toast';
import { AceptarregistroPage } from './aceptarregistro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AceptarregistroPageRoutingModule,
    ToastModule
  ],
  declarations: [AceptarregistroPage]
})
export class AceptarregistroPageModule {}

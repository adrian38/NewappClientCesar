import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContrasePageRoutingModule } from './contrase-routing.module';
import {ToastModule} from 'primeng/toast';
import { ContrasePage } from './contrase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContrasePageRoutingModule,
    ToastModule
  ],
  declarations: [ContrasePage]
})
export class ContrasePageModule {}

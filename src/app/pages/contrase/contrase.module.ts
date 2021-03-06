import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContrasePageRoutingModule } from './contrase-routing.module';
import {ToastModule} from 'primeng/toast';
import { ContrasePage } from './contrase.page';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContrasePageRoutingModule,
    ToastModule,
    ComponentsModule
  ],
  declarations: [ContrasePage]
})
export class ContrasePageModule {}

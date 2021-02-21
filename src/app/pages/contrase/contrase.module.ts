import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContrasePageRoutingModule } from './contrase-routing.module';

import { ContrasePage } from './contrase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContrasePageRoutingModule
  ],
  declarations: [ContrasePage]
})
export class ContrasePageModule {}

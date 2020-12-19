import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevasolicitdPageRoutingModule } from './nuevasolicitd-routing.module';

import { NuevasolicitdPage } from './nuevasolicitd.page';
import { NgCalendarModule  } from 'ionic2-calendar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevasolicitdPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [NuevasolicitdPage]
})
export class NuevasolicitdPageModule {}

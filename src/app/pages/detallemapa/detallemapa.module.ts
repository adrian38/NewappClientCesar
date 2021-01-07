import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallemapaPageRoutingModule } from './detallemapa-routing.module';

import { DetallemapaPage } from './detallemapa.page';


import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallemapaPageRoutingModule,
    AgmCoreModule,
  ],
  declarations: [DetallemapaPage]
})
export class DetallemapaPageModule {}

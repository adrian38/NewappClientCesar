import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaparesumenPageRoutingModule } from './maparesumen-routing.module';

import { MaparesumenPage } from './maparesumen.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaparesumenPageRoutingModule,
    AgmCoreModule
  ],
  declarations: [MaparesumenPage]
})
export class MaparesumenPageModule {}

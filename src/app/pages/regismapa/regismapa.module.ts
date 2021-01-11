import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegismapaPageRoutingModule } from './regismapa-routing.module';

import { RegismapaPage } from './regismapa.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegismapaPageRoutingModule,
    AgmCoreModule,
  ],
  declarations: [RegismapaPage]
})
export class RegismapaPageModule {}

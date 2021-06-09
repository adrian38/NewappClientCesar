import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SomosPageRoutingModule } from './somos-routing.module';

import { SomosPage } from './somos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SomosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SomosPage]
})
export class SomosPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TituloPageRoutingModule } from './titulo-routing.module';

import { TituloPage } from './titulo.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TituloPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TituloPage]
})
export class TituloPageModule {}

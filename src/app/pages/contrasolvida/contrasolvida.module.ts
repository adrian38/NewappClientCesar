import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContrasolvidaPageRoutingModule } from './contrasolvida-routing.module';

import { ContrasolvidaPage } from './contrasolvida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContrasolvidaPageRoutingModule
  ],
  declarations: [ContrasolvidaPage]
})
export class ContrasolvidaPageModule {}

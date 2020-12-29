import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContratadosPageRoutingModule } from './contratados-routing.module';

import { ContratadosPage } from './contratados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContratadosPageRoutingModule
  ],
  declarations: [ContratadosPage]
})
export class ContratadosPageModule {}

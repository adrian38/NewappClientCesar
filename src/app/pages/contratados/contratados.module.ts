import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContratadosPageRoutingModule } from './contratados-routing.module';
import {DialogModule} from 'primeng/dialog';
import { ContratadosPage } from './contratados.page';
import {RatingModule} from 'primeng/rating';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContratadosPageRoutingModule,
    DialogModule,
    RatingModule
  ],
  declarations: [ContratadosPage]
})
export class ContratadosPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContratadosPageRoutingModule } from './contratados-routing.module';
import {DialogModule} from 'primeng/dialog';
import { ContratadosPage } from './contratados.page';
import {RatingModule} from 'primeng/rating';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContratadosPageRoutingModule,
    DialogModule,
    RatingModule,
    ComponentsModule 
  ],
  declarations: [ContratadosPage]
})
export class ContratadosPageModule {}

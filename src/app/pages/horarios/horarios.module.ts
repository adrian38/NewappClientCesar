import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorariosPageRoutingModule } from './horarios-routing.module';
import { NgCalendarModule  } from 'ionic2-calendar';
import { HorariosPage } from './horarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorariosPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [HorariosPage]
})
export class HorariosPageModule {}

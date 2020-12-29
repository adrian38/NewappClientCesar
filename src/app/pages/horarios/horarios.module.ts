import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorariosPageRoutingModule } from './horarios-routing.module';
import { NgCalendarModule  } from 'ionic2-calendar';
import { HorariosPage } from './horarios.page';
import {CalendarModule} from 'primeng/calendar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorariosPageRoutingModule,
    NgCalendarModule,
    CalendarModule

  ],
  declarations: [HorariosPage]
})
export class HorariosPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';

import { RegistroPage } from './registro.page';
import {AvatarModule} from 'primeng/avatar';
import { SafeUrlPipePipe } from 'src/app/pipes/safe-url-pipe.pipe';
import { ComponentsModule } from 'src/app/components/components.module';
import {CalendarModule} from 'primeng/calendar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRoutingModule,
    AvatarModule,
    ComponentsModule,
    CalendarModule
   
    
  ],
  declarations: [RegistroPage]
  
})
export class RegistroPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';

import { RegistroPage } from './registro.page';
import {AvatarModule} from 'primeng/avatar';
import { SafeUrlPipePipe } from 'src/app/pipes/safe-url-pipe.pipe';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRoutingModule,
    AvatarModule,
    ComponentsModule
    
  ],
  declarations: [RegistroPage]
  
})
export class RegistroPageModule {}

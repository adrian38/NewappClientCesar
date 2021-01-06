import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotoPageRoutingModule } from './foto-routing.module';

import { FotoPage } from './foto.page';
import { SafeUrlPipePipe } from 'src/app/pipes/safe-url-pipe.pipe';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FotoPage]
})
export class FotoPageModule {}

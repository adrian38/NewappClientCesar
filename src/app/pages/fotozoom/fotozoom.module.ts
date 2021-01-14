import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotozoomPageRoutingModule } from './fotozoom-routing.module';

import { FotozoomPage } from './fotozoom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotozoomPageRoutingModule
  ],
  declarations: [FotozoomPage]
})
export class FotozoomPageModule {}

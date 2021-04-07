import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptionPageRoutingModule } from './option-routing.module';

import { OptionPage } from './option.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [OptionPage]
})
export class OptionPageModule {}

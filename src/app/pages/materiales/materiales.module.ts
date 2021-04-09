import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialesPageRoutingModule } from './materiales-routing.module';

import { MaterialesPage } from './materiales.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MaterialesPage]
})
export class MaterialesPageModule {}

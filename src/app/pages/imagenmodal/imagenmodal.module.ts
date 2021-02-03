import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagenmodalPageRoutingModule } from './imagenmodal-routing.module';

import { ImagenmodalPage } from './imagenmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagenmodalPageRoutingModule
  ],
  declarations: [ImagenmodalPage]
})
export class ImagenmodalPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotosProyectoPageRoutingModule } from './fotos-proyecto-routing.module';

import { FotosProyectoPage } from './fotos-proyecto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotosProyectoPageRoutingModule
  ],
  declarations: [FotosProyectoPage]
})
export class FotosProyectoPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DialogoPageRoutingModule } from './dialogo-routing.module';

import { DialogoPage } from './dialogo.page';
import {DialogModule} from 'primeng/dialog';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DialogoPageRoutingModule,
    DialogModule
  ],
  declarations: [DialogoPage]
})
export class DialogoPageModule {}

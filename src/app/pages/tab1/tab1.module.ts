import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';


import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import {ToastModule} from 'primeng/toast';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    Tab1PageRoutingModule,
    ToastModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}

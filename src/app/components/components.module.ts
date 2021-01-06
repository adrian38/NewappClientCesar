import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { IonicModule } from '@ionic/angular';
import { SafeUrlPipePipe } from '../pipes/safe-url-pipe.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    SolicitudComponent,
    SafeUrlPipePipe
  ],
  exports:[
    HeaderComponent,
    SolicitudComponent,
    SafeUrlPipePipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }

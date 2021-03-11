import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { IonicModule } from '@ionic/angular';
import { SafeUrlPipePipe } from '../pipes/safe-url-pipe.pipe';
import { ContratoComponent } from './contrato/contrato.component';
import { OfertaComponent } from './oferta/oferta.component';


@NgModule({
  declarations: [
    ContratoComponent,
    HeaderComponent,
    SolicitudComponent,
    OfertaComponent,
    SafeUrlPipePipe

  ],
  exports:[
    ContratoComponent,
    HeaderComponent,
    SolicitudComponent,
    OfertaComponent,
    SafeUrlPipePipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }

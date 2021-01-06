import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
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
    CommonModule
  ]
})
export class ComponentsModule { }

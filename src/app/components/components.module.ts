import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SolicitudComponent } from './solicitud/solicitud.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SolicitudComponent
  ],
  exports:[
    HeaderComponent,
    SolicitudComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }

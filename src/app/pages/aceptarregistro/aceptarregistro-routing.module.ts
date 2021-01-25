import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AceptarregistroPage } from './aceptarregistro.page';

const routes: Routes = [
  {
    path: '',
    component: AceptarregistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AceptarregistroPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaparesumenPage } from './maparesumen.page';

const routes: Routes = [
  {
    path: '',
    component: MaparesumenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaparesumenPageRoutingModule {}

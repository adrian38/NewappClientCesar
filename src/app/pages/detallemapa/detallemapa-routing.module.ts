import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallemapaPage } from './detallemapa.page';

const routes: Routes = [
  {
    path: '',
    component: DetallemapaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallemapaPageRoutingModule {}

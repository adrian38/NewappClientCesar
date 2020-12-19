import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevasolicitdPage } from './nuevasolicitd.page';

const routes: Routes = [
  {
    path: '',
    component: NuevasolicitdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevasolicitdPageRoutingModule {}

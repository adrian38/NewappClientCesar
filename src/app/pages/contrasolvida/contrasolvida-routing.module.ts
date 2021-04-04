import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContrasolvidaPage } from './contrasolvida.page';

const routes: Routes = [
  {
    path: '',
    component: ContrasolvidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContrasolvidaPageRoutingModule {}

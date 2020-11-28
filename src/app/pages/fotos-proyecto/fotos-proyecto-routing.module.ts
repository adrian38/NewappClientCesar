import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotosProyectoPage } from './fotos-proyecto.page';

const routes: Routes = [
  {
    path: '',
    component: FotosProyectoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotosProyectoPageRoutingModule {}

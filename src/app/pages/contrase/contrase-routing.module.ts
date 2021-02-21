import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContrasePage } from './contrase.page';

const routes: Routes = [
  {
    path: '',
    component: ContrasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContrasePageRoutingModule {}

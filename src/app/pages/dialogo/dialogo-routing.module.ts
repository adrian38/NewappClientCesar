import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DialogoPage } from './dialogo.page';

const routes: Routes = [
  {
    path: '',
    component: DialogoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DialogoPageRoutingModule {}

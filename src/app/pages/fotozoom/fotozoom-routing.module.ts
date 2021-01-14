import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotozoomPage } from './fotozoom.page';

const routes: Routes = [
  {
    path: '',
    component: FotozoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotozoomPageRoutingModule {}

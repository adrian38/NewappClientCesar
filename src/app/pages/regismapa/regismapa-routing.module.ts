import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegismapaPage } from './regismapa.page';

const routes: Routes = [
  {
    path: '',
    component: RegismapaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegismapaPageRoutingModule {}

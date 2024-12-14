import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pantalla1Page } from './pantalla1.page';

const routes: Routes = [
  {
    path: '',
    component: Pantalla1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pantalla1PageRoutingModule {}

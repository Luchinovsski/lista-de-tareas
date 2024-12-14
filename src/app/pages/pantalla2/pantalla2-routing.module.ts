import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pantalla2Page } from './pantalla2.page';

const routes: Routes = [
  {
    path: '',
    component: Pantalla2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pantalla2PageRoutingModule {}

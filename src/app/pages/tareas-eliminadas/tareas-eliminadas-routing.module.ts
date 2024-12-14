import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareasEliminadasPage } from './tareas-eliminadas.page';

const routes: Routes = [
  {
    path: '',
    component: TareasEliminadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareasEliminadasPageRoutingModule {}

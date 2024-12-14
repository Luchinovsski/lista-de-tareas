import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareasCompletadasPage } from './tareas-completadas.page';

const routes: Routes = [
  {
    path: '',
    component: TareasCompletadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareasCompletadasPageRoutingModule {}
